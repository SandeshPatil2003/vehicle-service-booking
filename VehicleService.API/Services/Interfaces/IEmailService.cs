using VehicleService.Models;

namespace VehicleService.API.Services.Interfaces
{
    public interface IEmailService
    {
        Task SendMailAsync(string to, string subject, string body);
        Task SendMechanicAssignmentEmailAsync(
            string toEmail,
            string mechanicName,
            Booking booking
        );
    }
}
