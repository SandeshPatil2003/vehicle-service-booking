using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VehicleService.API.Enums;
using VehicleService.API.Models;
using VehicleService.API.Services.Interfaces;

namespace VehicleService.API.Controllers
{
    [ApiController]
    [Route("api/mechanic/bookings")]
    [Authorize(Roles = "MECHANIC")]
    public class MechanicBookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public MechanicBookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        // GET: api/mechanic/bookings/my-jobs
        [HttpGet("my-jobs")]
        public async Task<IActionResult> GetMyJobs()
        {
            var email = User.FindFirstValue(ClaimTypes.Name);
            var bookings = await _bookingService.GetMechanicBookingsAsync(email);

            return Ok(bookings);
        }


        // PUT: api/mechanic/bookings/{id}/status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateBookingStatus(
            long id,
            [FromQuery] BookingStatus status)
        {
            var mechanicEmail = User.FindFirstValue(ClaimTypes.Name);

            var booking = await _bookingService.UpdateBookingStatusAsync(
                id,
                status,
                mechanicEmail
            );

            return Ok(booking);
        }

    }
}
