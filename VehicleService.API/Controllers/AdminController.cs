using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleService.API.DTOs;
using VehicleService.API.Services.Interfaces;
using VehicleService.API.Enums;
using VehicleService.API.DTOs.Auth;
using VehicleService.Repositories.Interfaces;
using VehicleService.API.DTOs.User;

namespace VehicleService.API.Controllers
{
    [ApiController]
    [Route("api/admin")]
    [Authorize(Roles = "ADMIN")]
    public class AdminController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMechanicService _mechanicService;
        private readonly IBookingService _bookingService;

        public AdminController(
            IUserService userService,
            IMechanicService mechanicService,
            IBookingService bookingService)
        {
            _userService = userService;
            _mechanicService = mechanicService;
            _bookingService = bookingService;
        }

        // POST: api/admin/create-admin
        [HttpPost("create-admin")]
        public async Task<IActionResult> CreateAdmin(
            [FromBody] RegisterRequest request)
        {
            var userRequest = new UserDTO.CreateUserRequest
            {
                Email = request.Email,
                Password = request.Password,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Phone = request.Phone
            };

            await _userService.RegisterUserAsync(
                userRequest,
                UserRole.ADMIN
            );

            return Ok("Admin created successfully");
        }

        [HttpPost("admins")]
        public async Task<IActionResult> CreateAdminAlt(
    [FromBody] RegisterRequest request)
        {
            var userRequest = new UserDTO.CreateUserRequest
            {
                Email = request.Email,
                Password = request.Password,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Phone = request.Phone
            };

            await _userService.RegisterUserAsync(userRequest, UserRole.ADMIN);
            return Ok("Admin created successfully");
        }


        /* ---------------- USERS ---------------- */
        // Already handled in AdminUserController ✔

        /* ---------------- MECHANICS ---------------- */
        // Already handled in AdminMechanicController ✔

        /* ---------------- BOOKINGS ---------------- */
        // Already handled in AdminBookingController ✔
    }
}
