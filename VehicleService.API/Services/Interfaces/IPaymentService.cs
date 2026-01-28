using VehicleService.API.DTOs;

namespace VehicleService.API.Services.Interfaces
{
    public interface IPaymentService
    {
        //Task<object> CreateOrderAsync(long bookingId, decimal amount);


        Task<CreateOrderResponse> CreateOrderAsync(long bookingId, decimal amount);
    }

}
