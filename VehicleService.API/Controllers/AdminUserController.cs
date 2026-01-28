    using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleService.API.DTOs.User;
using VehicleService.API.Enums;
using VehicleService.API.Services.Interfaces;
using VehicleService.Repositories.Interfaces;

namespace VehicleService.API.Controllers
{
    [ApiController]
    [Route("api/admin/users")]
    [Authorize(Roles = "ADMIN")]
    public class AdminUserController : ControllerBase
    {
        private readonly IUserService _userService;

        public AdminUserController(IUserService userService)
        {
            _userService = userService;
        }

        // =========================
        // GET ALL USERS
        // =========================
        [HttpGet]
        public async Task<ActionResult<List<UserDTO>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        // =========================
        // GET USERS BY ROLE
        // =========================
        [HttpGet("role/{role}")]
        public async Task<ActionResult<List<UserDTO>>> GetUsersByRole(string role)
        {
            var userRole = Enum.Parse<UserRole>(role.ToUpper());

            var users = await _userService.GetUsersByRoleAsync(userRole);
            return Ok(users);
        }

        // =========================
        // TOGGLE USER STATUS
        // =========================
        [HttpPut("{userId}/toggle-status")]
        public async Task<ActionResult<UserDTO>> ToggleUserStatus(long userId)
        {
            var user = await _userService.ToggleUserStatusAsync(userId);
            return Ok(user);
        }

        // =========================
        // USER STATS
        // =========================
        [HttpGet("stats")]
        public async Task<IActionResult> GetUserStats()
        {
            var totalCustomers =
                await _userService.CountUsersByRoleAsync(UserRole.CUSTOMER);

            var totalMechanics =
                await _userService.CountUsersByRoleAsync(UserRole.MECHANIC);

            var totalAdmins =
                await _userService.CountUsersByRoleAsync(UserRole.ADMIN);

            return Ok(new
            {
                totalCustomers,
                totalMechanics,
                totalAdmins,
                totalUsers = totalCustomers + totalMechanics + totalAdmins
            });
        }
    }
}
