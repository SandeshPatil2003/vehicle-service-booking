using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleService.API.Services.Interfaces;

//Admin Controller
namespace VehicleService.API.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/bookings")]
    [Authorize(Roles = "ADMIN")]
    public class AdminBookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public AdminBookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        // GET: /api/admin/bookings
        [HttpGet]
        public async Task<IActionResult> GetAllBookings()
        {
            var bookings = await _bookingService.GetAllBookingsAsync();
            return Ok(bookings);
        }
    }
}
