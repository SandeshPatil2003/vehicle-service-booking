namespace VehicleService.API.DTOs
{
    public class UpdateBookingRequest
    {
        public string? VehicleModel { get; set; }
        public string VehicleNumber { get; set; } = string.Empty;
        public string? ProblemDescription { get; set; }
        public string BookingDate { get; set; } = string.Empty;
        public string BookingTime { get; set; } = string.Empty;
    }

}
