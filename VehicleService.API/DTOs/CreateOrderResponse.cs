namespace VehicleService.API.DTOs
{
    public class CreateOrderResponse
    {
        public string OrderId { get; set; } = string.Empty;
        public decimal Amount { get; set; }
    }
}
