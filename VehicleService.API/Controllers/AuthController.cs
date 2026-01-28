using Microsoft.AspNetCore.Mvc;
using System.Net;
using VehicleService.API.DTOs.Auth;
using VehicleService.API.DTOs.User;
using VehicleService.API.Services.Interfaces;

namespace VehicleService.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // =========================
        // LOGIN
        // =========================
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] AuthRequest request)
        {
            var response = await _authService.LoginAsync(request);
            return Ok(response);
        }

        // =========================
        // REGISTER
        // =========================
        [HttpPost("register")]
        public async Task<ActionResult<string>> Register([FromBody] RegisterRequest request)
        {
            await _authService.RegisterAsync(request);
            return StatusCode((int)HttpStatusCode.Created,
                "User registered successfully. Please login.");
        }

        // =========================
        // FORGOT PASSWORD
        // =========================
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromQuery] string email)
        {
            await _authService.ForgotPasswordAsync(email);

            return Ok(new
            {
                message = "Reset password email sent"
            });
        }

     
        [HttpPost("refresh")]
        public IActionResult RefreshToken()
        {
            // Optional: implement later
            return Ok();
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(
    [FromQuery] string token,
    [FromQuery] string newPassword)
        {
            await _authService.ResetPasswordAsync(token, newPassword);

            return Ok(new
            {
                message = "Password reset successful"
            });
        }

    }
}
