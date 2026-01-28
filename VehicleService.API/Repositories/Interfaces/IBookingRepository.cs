using VehicleService.API.Enums;
using VehicleService.API.Models;
using VehicleService.Models;

namespace VehicleService.API.Repositories.Interfaces
{
    public interface IBookingRepository : IRepository<Booking>
    {
        Task<List<Booking>> GetByUserAsync(long userId);
        Task<List<Booking>> GetByMechanicAsync(long mechanicId);

        Task<Booking?> GetByBookingNumberAsync(string bookingNumber);

        Task<List<Booking>> GetByUserAndStatusesAsync(
            long userId,
            List<BookingStatus> statuses
        );

        Task<List<Booking>> GetByMechanicAndStatusesAsync(
            long mechanicId,
            List<BookingStatus> statuses
        );

        Task<List<Booking>> GetBookingsByDateAsync(DateOnly date);

        Task<List<Booking>> GetUnassignedPendingBookingsAsync();

        Task<List<Booking>> GetAssignedBookingsByMechanicAsync(long mechanicId);

        Task<List<Booking>> GetCompletedUnpaidBookingsAsync();

        Task<long> CountByStatusAsync(BookingStatus status);

        Task<decimal?> GetRevenueBetweenDatesAsync(
            DateTime startDate,
            DateTime endDate
        );

        Task<List<Booking>> GetBookingsBetweenDatesAsync(
            DateTime startDate,
            DateTime endDate
        );

        Task AddAsync(Booking booking);
        Task SaveChangesAsync();


        Task<List<Booking>> GetAllAsync();

        Task<Booking?> GetByIdAsync(long id);

        Task<Booking?> GetByIdWithDetailsAsync(long id);

        Task UpdateAsync(Booking booking);


    }
}
