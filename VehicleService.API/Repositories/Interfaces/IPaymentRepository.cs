using VehicleService.API.Models;

using VehicleService.API.Enums;

namespace VehicleService.API.Repositories.Interfaces
{
    public interface IPaymentRepository : IRepository<Payment>
    {
        Task<Payment?> GetByIdAsync(long id);
        Task<Payment?> GetByBookingIdAsync(long bookingId);
        Task<Payment?> GetByRazorpayOrderIdAsync(string razorpayOrderId);
        Task<Payment?> GetByRazorpayPaymentIdAsync(string razorpayPaymentId);
        Task<long> CountByStatusAsync(PaymentStatus status);
        Task AddAsync(Payment payment);
        void Update(Payment payment);
        Task SaveChangesAsync();


        Task SaveAsync(Payment payment);
    }
}
