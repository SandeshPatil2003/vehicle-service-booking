using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VehicleService.API.DTOs.User;
using VehicleService.API.Services.Interfaces;

namespace VehicleService.API.Controllers
{
    [ApiController]
    [Route("api/user")]
    [Authorize] // any authenticated user
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // =========================
        // GET PROFILE
        // =========================
        [HttpGet("profile")]
        public async Task<ActionResult<UserDTO>> GetProfile()
        {
            var email = User.FindFirstValue(ClaimTypes.Name);

            var profile = await _userService.GetUserProfileAsync(email);
            return Ok(profile);
        }

        // =========================
        // UPDATE PROFILE
        // =========================
        [HttpPut("profile")]
        public async Task<ActionResult<UserDTO>> UpdateProfile(
            [FromBody] UserDTO.ProfileUpdateRequest request)
        {
            var email = User.FindFirstValue(ClaimTypes.Name);

            var updatedProfile =
                await _userService.UpdateUserProfileAsync(email, request);

            return Ok(updatedProfile);
        }

        // =========================
        // CHANGE PASSWORD
        // =========================
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(
            [FromBody] UserDTO.PasswordChangeRequest request)
        {
            if (request.NewPassword != request.ConfirmPassword)
            {
                return BadRequest("New password and confirm password do not match");
            }

            var email = User.FindFirstValue(ClaimTypes.Name);

            await _userService.ChangePasswordAsync(
                email,
                request.CurrentPassword,
                request.NewPassword
            );

            return Ok("Password changed successfully");
        }

        // =========================
        // DELETE ACCOUNT (SOFT DELETE)
        // =========================
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteAccount()
        {
            var email = User.FindFirstValue(ClaimTypes.Name);

            await _userService.DeleteUserAccountAsync(email);
            return Ok("Account deleted successfully");
        }
    }
}
