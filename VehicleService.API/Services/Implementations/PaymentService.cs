using Razorpay.Api;
using VehicleService.API.DTOs;

using VehicleService.API.Services.Interfaces;

namespace VehicleService.API.Services.Implementations
{
    public class PaymentService : IPaymentService
    {
        private readonly IConfiguration _configuration;

        public PaymentService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Task<CreateOrderResponse> CreateOrderAsync(long bookingId, decimal amount)
        {
            // 🔐 Razorpay credentials from appsettings.json
            var key = _configuration["Razorpay:Key"];
            var secret = _configuration["Razorpay:Secret"];

            var client = new RazorpayClient(key, secret);

            var options = new Dictionary<string, object>
            {
                { "amount", amount * 100 }, // Razorpay expects paise
                { "currency", "INR" },
                { "receipt", $"booking_{bookingId}" }
            };

            Order order = client.Order.Create(options);

            return Task.FromResult(new CreateOrderResponse
            {
                OrderId = order["id"].ToString(),
                Amount = amount
            });
        }
    }
}
