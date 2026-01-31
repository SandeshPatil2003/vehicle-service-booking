using Microsoft.EntityFrameworkCore;
using System.Linq;
using VehicleService.API.Data;
using VehicleService.API.Enums;
using VehicleService.API.Models;
using VehicleService.API.Repositories.Interfaces;
using VehicleService.Models;

namespace VehicleService.API.Repositories.Implementations
{
    public class BookingRepository : IBookingRepository
    {
        private readonly ApplicationDbContext _context;

        public BookingRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Booking>> GetByUserAsync(long userId)
        {
            return await _context.Bookings
                .Include(b => b.Service)
                .Include(b => b.Mechanic)
                .ThenInclude(m => m.User)
                .Where(b => b.UserId == userId)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Booking>> GetByMechanicAsync(long mechanicId)
        {
            return await _context.Bookings
                .Include(b => b.Service)
                .Include(b => b.User)
                .Where(b => b.MechanicId == mechanicId)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
        }

        public async Task<Booking?> GetByBookingNumberAsync(string bookingNumber)
        {
            return await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Mechanic)
                .Include(b => b.Service)
                .FirstOrDefaultAsync(b => b.BookingNumber == bookingNumber);
        }

        public async Task<List<Booking>> GetByUserAndStatusesAsync(
            long userId,
            List<BookingStatus> statuses)
        {
            return await _context.Bookings
                .Where(b => b.UserId == userId && statuses.Contains(b.Status))
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Booking>> GetByMechanicAndStatusesAsync(
            long mechanicId,
            List<BookingStatus> statuses)
        {
            return await _context.Bookings
                .Where(b => b.MechanicId == mechanicId && statuses.Contains(b.Status))
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Booking>> GetBookingsByDateAsync(DateOnly date)
        {
            return await _context.Bookings
                .Where(b =>
                    b.BookingDate == date &&
                    b.Status != BookingStatus.CANCELLED
                )
                .ToListAsync();
        }

        public async Task<List<Booking>> GetUnassignedPendingBookingsAsync()
        {
            return await _context.Bookings
                .Include(b => b.Service)
                .Include(b => b.Mechanic)
                .ThenInclude(m => m.User)
                .Where(b =>
                    b.Status == BookingStatus.PENDING &&
                    b.MechanicId == null
                )
                .ToListAsync();
        }

        public async Task<List<Booking>> GetAssignedBookingsByMechanicAsync(long mechanicId)
        {
            return await _context.Bookings
                .Where(b =>
                    b.Status == BookingStatus.ASSIGNED &&
                    b.MechanicId == mechanicId
                )
                .ToListAsync();
        }

        public async Task<List<Booking>> GetCompletedUnpaidBookingsAsync()
        {
            return await _context.Bookings
                .Where(b =>
                    b.Status == BookingStatus.COMPLETED &&
                    b.PaymentStatus == PaymentStatus.PENDING
                )
                .ToListAsync();
        }

        public async Task<long> CountByStatusAsync(BookingStatus status)
        {
            return await _context.Bookings.LongCountAsync(b => b.Status == status);
        }

        public async Task<Booking?> GetByIdAsync(long id)
        {
            return await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Mechanic).ThenInclude(m => m.User)
                .Include(b => b.Service)
                .FirstOrDefaultAsync(b => b.Id == id);
        }


        public async Task<decimal?> GetRevenueBetweenDatesAsync(
            DateTime startDate,
            DateTime endDate)
        {
            return await _context.Bookings
                .Where(b =>
                    b.PaymentStatus == Enums.PaymentStatus.PAID &&
                    b.CreatedAt >= startDate &&
                    b.CreatedAt <= endDate
                )
                .SumAsync(b => b.TotalAmount);
        }

        public async Task<List<Booking>> GetBookingsBetweenDatesAsync(
            DateTime startDate,
            DateTime endDate)
        {
            return await _context.Bookings
                .Where(b =>
                    b.CreatedAt >= startDate &&
                    b.CreatedAt <= endDate
                )
                .ToListAsync();
        }

        public async Task<List<Booking>> GetAllAsync()
        {
            return await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Mechanic).ThenInclude(m => m.User)
                .Include(b => b.Service)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
        }

        public async Task UpdateAsync(Booking booking)
        {
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();
        }


        public async Task AddAsync(Booking booking)
        {
            await _context.Bookings.AddAsync(booking);
            await _context.SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }




      

        public async Task DeleteAsync(Booking booking)
        {
            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
        }

        public async Task<Booking?> GetByIdWithDetailsAsync(long id)
        {
            return await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Service)
                .Include(b => b.Mechanic)
                    .ThenInclude(m => m.User)
                .FirstOrDefaultAsync(b => b.Id == id);
        }


    }
}
