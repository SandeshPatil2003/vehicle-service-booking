using VehicleService.API.DTOs;
using VehicleService.API.DTOs.Booking;
using VehicleService.API.Enums;
using VehicleService.API.Models;
using VehicleService.API.Repositories.Interfaces;
using VehicleService.API.Services.Interfaces;
using VehicleService.Models;
using VehicleService.Repositories.Interfaces;

namespace VehicleService.API.Services.Implementations
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IUserRepository _userRepository;
        private readonly IServiceRepository _serviceRepository;
        private readonly IMechanicRepository _mechanicRepository;
        private readonly IPaymentRepository _paymentRepository;
        private readonly IEmailService _emailService;

        public BookingService(
            IBookingRepository bookingRepository,
            IUserRepository userRepository,
            IServiceRepository serviceRepository,
            IMechanicRepository mechanicRepository,
            IPaymentRepository paymentRepository,
            IEmailService emailService)
        {
            _bookingRepository = bookingRepository;
            _userRepository = userRepository;
            _serviceRepository = serviceRepository;
            _mechanicRepository = mechanicRepository;
            _paymentRepository = paymentRepository;
            _emailService = emailService;
        }

        // ================= CREATE BOOKING =================
        public async Task<BookingResponse> CreateBookingAsync(
            BookingRequest request,
            string userEmail)
        {
            var user = await _userRepository.GetByEmailAsync(userEmail)
                ?? throw new Exception("User not found");

            var service = await _serviceRepository.GetByIdAsync(request.ServiceId)
                ?? throw new Exception("Service not found");

            var assignedMechanic = await AssignMechanicAsync(service);

            var booking = new Booking
            {
                UserId = user.Id,
                User = user,
                ServiceId = service.Id,
                Service = service,
                VehicleType = request.VehicleType,
                VehicleModel = request.VehicleModel,
                VehicleNumber = request.VehicleNumber,
                ProblemDescription = request.ProblemDescription,
                /* BookingDate = request.BookingDate,
                 BookingTime = request.BookingTime,*/

                BookingDate = DateOnly.Parse(request.BookingDate),
                BookingTime = TimeSpan.Parse(request.BookingTime),

                TotalAmount = service.BasePrice,
                Status = BookingStatus.PENDING,
                PaymentStatus = PaymentStatus.PENDING,
                CreatedAt = DateTime.UtcNow
            };

            if (assignedMechanic != null)
            {
                booking.MechanicId = assignedMechanic.Id;
                booking.Status = BookingStatus.ASSIGNED;
                booking.AssignedAt = DateTime.UtcNow;

                assignedMechanic.CurrentJobCount++;
                if (assignedMechanic.CurrentJobCount >= assignedMechanic.MaxJobs)
                    assignedMechanic.IsAvailable = false;

                await _mechanicRepository.UpdateAsync(assignedMechanic);

                // EMAIL MECHANIC
                await _emailService.SendMechanicAssignmentEmailAsync(
                    assignedMechanic.User.Email,
                    assignedMechanic.User.FirstName,
                    booking
                );
            }

            await _bookingRepository.AddAsync(booking);

            // 🔥 RELOAD with navigation properties
            var savedBooking = await _bookingRepository.GetByIdWithDetailsAsync(booking.Id);

            return MapToResponse(savedBooking);
        }

        // ================= MECHANIC ASSIGNMENT =================
        private async Task<Mechanic?> AssignMechanicAsync(Service service)
        {
            var mechanics = await _mechanicRepository
                .GetAvailableBySkillAsync(service.RequiredSkill);

            /*if (!mechanics.Any())
                mechanics = await _mechanicRepository.GetAvailableAndNotFullAsync();*/

            return mechanics.FirstOrDefault();
        }

        // ================= UPDATE BOOKING STATUS =================
        public async Task<BookingResponse> UpdateBookingStatusAsync(
            long bookingId,
            BookingStatus status,
            string mechanicEmail)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId)
                ?? throw new Exception("Booking not found");

            if (booking.Mechanic == null ||
                booking.Mechanic.User.Email != mechanicEmail)
                throw new UnauthorizedAccessException();

            booking.Status = status;

            if (status == BookingStatus.IN_PROGRESS)
            {
                booking.StartedAt = DateTime.UtcNow;
            }
            else if (status == BookingStatus.COMPLETED)
            {
                booking.CompletedAt = DateTime.UtcNow;
                booking.PaymentStatus = PaymentStatus.PENDING;

                var mechanic = booking.Mechanic;

                mechanic.CurrentJobCount--;

                if (mechanic.CurrentJobCount < 0)
                    mechanic.CurrentJobCount = 0;

                if (mechanic.CurrentJobCount < mechanic.MaxJobs)
                    mechanic.IsAvailable = true;

                await _mechanicRepository.UpdateAsync(mechanic);

                await CreatePaymentAsync(booking);
            }
            else if (status == BookingStatus.CANCELLED)
            {
                booking.CancelledAt = DateTime.UtcNow;

                var mechanic = booking.Mechanic;
                mechanic.CurrentJobCount--;

                if (mechanic.CurrentJobCount < mechanic.MaxJobs)
                    mechanic.IsAvailable = true;

                await _mechanicRepository.UpdateAsync(mechanic);
            }

            await _bookingRepository.UpdateAsync(booking);
            return MapToResponse(booking);
        }

        // ================= CREATE PAYMENT =================
        private async Task CreatePaymentAsync(Booking booking)
        {
            var existing = await _paymentRepository.GetByBookingIdAsync(booking.Id);
            if (existing != null) return;

            var payment = new Payment
            {
                BookingId = booking.Id,
                Amount = booking.TotalAmount,
                Status = PaymentStatus.PENDING,
                CreatedAt = DateTime.UtcNow
            };

            await _paymentRepository.AddAsync(payment);
        }

        // ================= PROCESS PAYMENT =================
        public async Task<BookingResponse> ProcessPaymentAsync(
            long bookingId,
            string paymentId,
            string signature)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId)
                ?? throw new Exception("Booking not found");

            var payment = await _paymentRepository.GetByBookingIdAsync(bookingId)
                ?? new Payment
                {
                    BookingId = booking.Id,
                    Amount = booking.TotalAmount,
                    CreatedAt = DateTime.UtcNow
                };

            payment.RazorpayPaymentId = paymentId;
            payment.RazorpaySignature = signature;
            payment.PaymentMethod = "RAZORPAY";
            payment.Status = PaymentStatus.PAID;

            booking.Status = BookingStatus.COMPLETED;
            booking.PaymentStatus = PaymentStatus.PAID;
            booking.PaidAt = DateTime.UtcNow;

            await _paymentRepository.SaveAsync(payment);
            await _bookingRepository.UpdateAsync(booking);

            return MapToResponse(booking);
        }

        // ================= READ METHODS =================
        public async Task<List<BookingResponse>> GetUserBookingsAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email)
                ?? throw new Exception("User not found");

            return (await _bookingRepository.GetByUserAsync(user.Id))
                .Select(MapToResponse)
                .ToList();
        }

        public async Task<List<BookingResponse>> GetMechanicBookingsAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email)
                ?? throw new Exception("User not found");

            var mechanic = await _mechanicRepository.GetByUserIdAsync(user.Id)
                ?? throw new Exception("Mechanic not found");

            return (await _bookingRepository.GetByMechanicAsync(mechanic.Id))
                .Select(MapToResponse)
                .ToList();
        }

        public async Task<List<BookingResponse>> GetAllBookingsAsync()
        {
            return (await _bookingRepository.GetAllAsync())
                .Select(MapToResponse)
                .ToList();
        }

        // ================= CANCEL =================
        public async Task CancelBookingAsync(
            long bookingId,
            string reason,
            string userEmail)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId)
                ?? throw new Exception("Booking not found");

            if (booking.User.Email != userEmail)
                throw new UnauthorizedAccessException();

            if (booking.Status != BookingStatus.PENDING)
                throw new InvalidOperationException("Only pending bookings can be cancelled");

            booking.Status = BookingStatus.CANCELLED;
            booking.CancelledAt = DateTime.UtcNow;
            booking.CancellationReason = reason;

            await _bookingRepository.UpdateAsync(booking);
        }

        // ================= MAPPER =================
        private BookingResponse MapToResponse(Booking booking)
        {
            return BookingResponse.FromEntity(booking);
        }

        public async Task<BookingResponse> UpdateBookingAsync(
    long bookingId,
    UpdateBookingRequest request,
    string userEmail)
        {
            var booking = await _bookingRepository.GetByIdWithDetailsAsync(bookingId)
                ?? throw new Exception("Booking not found");

            if (booking.User.Email != userEmail)
                throw new Exception("Unauthorized");

            if (booking.Status != BookingStatus.PENDING)
                throw new Exception("Only pending bookings can be edited");

            booking.VehicleModel = request.VehicleModel;
            booking.VehicleNumber = request.VehicleNumber;
            booking.ProblemDescription = request.ProblemDescription;
            booking.BookingDate = DateOnly.Parse(request.BookingDate);
            booking.BookingTime = TimeSpan.Parse(request.BookingTime);

            await _bookingRepository.UpdateAsync(booking);

            return BookingResponse.FromEntity(booking);
        }



        public async Task<BookingResponse?> GetBookingByIdAsync(long id, string email)
        {
            var booking = await _bookingRepository.GetByIdWithDetailsAsync(id);

            if (booking == null)
                return null;

            if (booking.User.Email != email)
                throw new Exception("Unauthorized access");

            return MapToResponse(booking);
        }


        public async Task<BookingResponse> UpdateBookingAsync(
    long id,
    BookingRequest request,
    string email)
{
    var booking = await _bookingRepository.GetByIdWithDetailsAsync(id)
        ?? throw new Exception("Booking not found");

    if (booking.User.Email != email)
        throw new Exception("Unauthorized");

    if (booking.Status != BookingStatus.PENDING)
        throw new Exception("Only pending bookings can be edited");

    booking.VehicleType = request.VehicleType;
    booking.VehicleModel = request.VehicleModel;
    booking.VehicleNumber = request.VehicleNumber;
    booking.ProblemDescription = request.ProblemDescription;
    booking.BookingDate = DateOnly.Parse(request.BookingDate);
    booking.BookingTime = TimeSpan.Parse(request.BookingTime);

    await _bookingRepository.UpdateAsync(booking);

    var updated = await _bookingRepository.GetByIdWithDetailsAsync(id);
    return MapToResponse(updated!);
}

    }
}
