using VehicleService.API.DTOs;
using VehicleService.API.DTOs.Booking;
using VehicleService.API.Enums;
using VehicleService.API.Models;

namespace VehicleService.API.Services.Interfaces
{
    public interface IBookingService
    {
        Task<BookingResponse> CreateBookingAsync(BookingRequest request, string userEmail);

        Task<BookingResponse> UpdateBookingStatusAsync(
            long bookingId,
            BookingStatus status,
            string mechanicEmail
        );

        Task<BookingResponse> ProcessPaymentAsync(
            long bookingId,
            string paymentId,
            string signature
        );

        Task<List<BookingResponse>> GetUserBookingsAsync(string userEmail);
        Task<List<BookingResponse>> GetMechanicBookingsAsync(string mechanicEmail);
        Task<List<BookingResponse>> GetAllBookingsAsync();

        Task CancelBookingAsync(long bookingId, string reason, string userEmail);

        Task<BookingResponse> UpdateBookingAsync(
            long bookingId,
            UpdateBookingRequest request,
            string userEmail);


        Task<BookingResponse?> GetBookingByIdAsync(long id, string email);
        Task<BookingResponse> UpdateBookingAsync(long id, BookingRequest request, string email);

    }
}
