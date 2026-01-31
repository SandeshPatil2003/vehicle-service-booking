/*using Microsoft.EntityFrameworkCore;
using VehicleService.API.Data;
using VehicleService.API.Enums;
using VehicleService.API.Repositories.Interfaces;
using VehicleService.API.Services.Interfaces;

namespace VehicleService.API.Services.Implementations
{
    public class MechanicAllocator : IMechanicAllocator
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<MechanicAllocator> _logger;

        private readonly IBookingRepository _bookingRepository;
        private readonly IMechanicRepository _mechanicRepository;
        private readonly IEmailService _emailService;

      *//*  public MechanicAllocator(ApplicationDbContext context, )
        {
            _context = context;
            _logger = logger;
        }*//*
        public MechanicAllocator(
            ApplicationDbContext context,
       IBookingRepository bookingRepository,
       IMechanicRepository mechanicRepository,
       IEmailService emailService,
       ILogger<MechanicAllocator> logger)
        {
            _bookingRepository = bookingRepository;
            _mechanicRepository = mechanicRepository;
            _emailService = emailService;
            _context = context;
            _logger = logger;
        }

        public async Task AllocatePendingBookingsAsync()
        {
            *//* var pendingBookings = await _context.Bookings
                 .Where(b => b.Status == BookingStatus.PENDING)
                 .ToListAsync();*//*

            // ✅ Load bookings WITH service
            var pendingBookings = await _bookingRepository
                .GetUnassignedPendingBookingsAsync();

            if (!pendingBookings.Any())
            {
                _logger.LogInformation("No pending bookings found");
                return;
            }

            var availableMechanics = await _context.Mechanics
                .Where(m => m.IsAvailable && m.CurrentJobCount < m.MaxJobs)
                .OrderBy(m => m.CurrentJobCount)
                .ToListAsync();

            foreach (var booking in pendingBookings)
            {
               

                var mechanic = availableMechanics.FirstOrDefault();
                if (mechanic == null)
                {
                    _logger.LogWarning(
                        "No mechanic available for booking {BookingId}",
                        booking.Id
                    );
                    continue;
                }

                booking.MechanicId = mechanic.Id;
                booking.Status = BookingStatus.ASSIGNED;
                booking.AssignedAt = DateTime.UtcNow;

                mechanic.CurrentJobCount++;

                if (mechanic.CurrentJobCount >= mechanic.MaxJobs)
                    mechanic.IsAvailable = false;

                await _mechanicRepository.UpdateAsync(mechanic);
                await _bookingRepository.UpdateAsync(booking);

                // SEND EMAIL
                *//*  await _emailService.SendMechanicAssignmentEmailAsync(
                      mechanic.User.Email,
                      mechanic.User.FirstName,
                      booking);*//*

                try
                {
                    await _emailService.SendMechanicAssignmentEmailAsync(
                        mechanic.User.Email,
                        mechanic.User.FirstName,
                        booking
                    );
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex,
                        "Failed to send email to mechanic {Email}",
                        mechanic.User.Email);
                }
            }

          //  await _context.SaveChangesAsync();
            _logger.LogInformation("Pending bookings allocated successfully");
        }
    }

}
*/


using Microsoft.Extensions.Logging;
using VehicleService.API.Enums;
using VehicleService.API.Repositories.Interfaces;
using VehicleService.API.Services.Interfaces;

namespace VehicleService.API.Services.Implementations
{
    public class MechanicAllocator : IMechanicAllocator
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IMechanicRepository _mechanicRepository;
        private readonly IEmailService _emailService;
        private readonly ILogger<MechanicAllocator> _logger;

        public MechanicAllocator(
            IBookingRepository bookingRepository,
            IMechanicRepository mechanicRepository,
            IEmailService emailService,
            ILogger<MechanicAllocator> logger)
        {
            _bookingRepository = bookingRepository;
            _mechanicRepository = mechanicRepository;
            _emailService = emailService;
            _logger = logger;
        }

        public async Task AllocatePendingBookingsAsync()
        {
            // ✅ Load unassigned pending bookings WITH Service + User
            var pendingBookings =
                await _bookingRepository.GetUnassignedPendingBookingsAsync();

            if (!pendingBookings.Any())
            {
                _logger.LogInformation("No pending bookings found");
                return;
            }

            foreach (var booking in pendingBookings)
            {
                // ✅ Skill-based mechanic selection
                var mechanics = await _mechanicRepository
                    .GetAvailableBySkillAsync(booking.Service.RequiredSkill);

                var mechanic = mechanics.FirstOrDefault();

                if (mechanic == null)
                {
                    _logger.LogWarning(
                        "No mechanic available for booking {BookingId} with skill {Skill}",
                        booking.Id,
                        booking.Service.RequiredSkill);
                    continue;
                }

                // ✅ Assign mechanic
                booking.MechanicId = mechanic.Id;
                booking.Status = BookingStatus.ASSIGNED;
                booking.AssignedAt = DateTime.UtcNow;

                mechanic.CurrentJobCount++;

                if (mechanic.CurrentJobCount >= mechanic.MaxJobs)
                    mechanic.IsAvailable = false;

                // ✅ Persist
                await _mechanicRepository.UpdateAsync(mechanic);
                await _bookingRepository.UpdateAsync(booking);

                // ✅ Send email (non-blocking)
                try
                {
                    await _emailService.SendMechanicAssignmentEmailAsync(
                        mechanic.User.Email,
                        mechanic.User.FirstName,
                        booking);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex,
                        "Failed to send assignment email to {Email}",
                        mechanic.User.Email);
                }
            }

            _logger.LogInformation("Pending bookings allocated successfully");
        }
    }
}