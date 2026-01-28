using System.Net;
using System.Net.Mail;
using VehicleService.API.Models;
using VehicleService.API.Services.Interfaces;
using VehicleService.Models;

namespace VehicleService.API.Services.Implementations
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendMailAsync(string to, string subject, string body)
        {
            var smtpClient = new SmtpClient
            {
                Host = _configuration["EmailSettings:SmtpHost"],
                Port = int.Parse(_configuration["EmailSettings:Port"]),
                EnableSsl = true,
                Credentials = new NetworkCredential(
                    _configuration["EmailSettings:FromEmail"],
                    _configuration["EmailSettings:AppPassword"]
                )
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_configuration["EmailSettings:FromEmail"]),
                Subject = subject,
                Body = body,
                IsBodyHtml = false
            };

            mailMessage.To.Add(to);

            await smtpClient.SendMailAsync(mailMessage);
        }

        public async Task SendMechanicAssignmentEmailAsync(
            string toEmail,
            string mechanicName,
            Booking booking
        )
        {
            string subject = "🚗 New Job Assigned – Vehicle Service System";

            string body =
                $"Hello {mechanicName},\n\n" +
                "You have been assigned a new service job.\n\n" +
                "Booking Details:\n" +
                $"Service: {booking.Service.Name}\n" +
                $"Vehicle: {booking.VehicleNumber}\n" +
                $"Date: {booking.BookingDate}\n" +
                $"Time: {booking.BookingTime}\n\n" +
                "Please login to your dashboard to accept and proceed.\n\n" +
                "Regards,\nVehicle Service System";

            await SendMailAsync(toEmail, subject, body);
        }
    }
}
