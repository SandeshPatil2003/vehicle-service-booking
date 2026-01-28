using VehicleService.API.DTOs.Auth;

namespace VehicleService.API.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> LoginAsync(AuthRequest request);
        Task RegisterAsync(RegisterRequest request);
        Task<AuthResponse> RefreshTokenAsync(string email);
        Task ForgotPasswordAsync(string email);

        Task ResetPasswordAsync(string token, string newPassword);

    }
}
