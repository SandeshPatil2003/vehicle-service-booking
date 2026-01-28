namespace VehicleService.API.DTO
{
    public class PaymentRequest
    {
        public string PaymentId { get; set; } = string.Empty;
        public string Signature { get; set; } = string.Empty;
    }
}

