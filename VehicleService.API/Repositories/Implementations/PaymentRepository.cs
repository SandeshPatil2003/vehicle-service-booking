using Microsoft.EntityFrameworkCore;
using VehicleService.API.Data;
using VehicleService.API.Enums;
using VehicleService.API.Models;
using VehicleService.API.Repositories.Interfaces;

namespace VehicleService.API.Repositories.Implementations
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly ApplicationDbContext _context;

        public PaymentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Payment?> GetByIdAsync(long id)
        {
            return await _context.Payments
                .Include(p => p.Booking)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Payment?> GetByBookingIdAsync(long bookingId)
        {
            return await _context.Payments
                .Include(p => p.Booking)
                .FirstOrDefaultAsync(p => p.BookingId == bookingId);
        }

        public async Task<Payment?> GetByRazorpayOrderIdAsync(string razorpayOrderId)
        {
            return await _context.Payments
                .FirstOrDefaultAsync(p => p.RazorpayOrderId == razorpayOrderId);
        }

        public async Task<Payment?> GetByRazorpayPaymentIdAsync(string razorpayPaymentId)
        {
            return await _context.Payments
                .FirstOrDefaultAsync(p => p.RazorpayPaymentId == razorpayPaymentId);
        }

        public async Task<long> CountByStatusAsync(PaymentStatus status)
        {
            return await _context.Payments
                .LongCountAsync(p => p.Status == status);
        }

        public async Task AddAsync(Payment payment)
        {
            await _context.Payments.AddAsync(payment);
        }

        public void Update(Payment payment)
        {
            _context.Payments.Update(payment);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }


      /*  public async Task<Payment?> GetByIdAsync(long id) =>
        await _context.Payments.FindAsync(id);
*/
        public async Task<List<Payment>> GetAllAsync() =>
            await _context.Payments.ToListAsync();

        /*public async Task AddAsync(Payment payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
        }*/

        public async Task UpdateAsync(Payment payment)
        {
            _context.Payments.Update(payment);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Payment payment)
        {
            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();
        }

      /*  public async Task<Payment?> GetByBookingIdAsync(long bookingId) =>
            await _context.Payments
                .FirstOrDefaultAsync(p => p.BookingId == bookingId);
*/
        public async Task SaveAsync(Payment payment)
        {
            if (payment.Id == 0)
                _context.Payments.Add(payment);
            else
                _context.Payments.Update(payment);

            await _context.SaveChangesAsync();
        }
    }
}
