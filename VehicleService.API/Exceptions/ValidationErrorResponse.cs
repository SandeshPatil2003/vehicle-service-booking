namespace VehicleService.API.Models
{
    public class ValidationErrorResponse : ErrorResponse
    {
        public Dictionary<string, string> FieldErrors { get; set; } = new();
    }
}
