namespace VehicleService.API.DTOs
{
    public class CreateOrderRequest
    {
        public long BookingId { get; set; }
        public decimal Amount { get; set; }
    }

}
