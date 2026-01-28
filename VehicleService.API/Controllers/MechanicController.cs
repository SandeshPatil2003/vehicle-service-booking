using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VehicleService.API.DTOs;
using VehicleService.API.Services.Interfaces;

namespace VehicleService.API.Controllers
{
    [ApiController]
    [Route("api/mechanic")]
    [Authorize(Roles = "MECHANIC")]
    public class MechanicController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly IMechanicService _mechanicService;

        public MechanicController(
            IBookingService bookingService,
            IMechanicService mechanicService)
        {
            _bookingService = bookingService;
            _mechanicService = mechanicService;
        }

        // GET: api/mechanic/jobs
        [HttpGet("jobs")]
        public async Task<IActionResult> GetAssignedJobs()
        {
            var mechanicEmail = User.FindFirstValue(ClaimTypes.Name);

            var jobs = await _bookingService
                .GetMechanicBookingsAsync(mechanicEmail);

            return Ok(jobs);
        }

        // GET: api/mechanic/profile
        [HttpGet("profile")]
        public async Task<IActionResult> GetMyProfile()
        {
            var email = User.FindFirstValue(ClaimTypes.Name);

            var profile = await _mechanicService
                .GetMechanicByEmailAsync(email);

            return Ok(profile);
        }
    }
}
