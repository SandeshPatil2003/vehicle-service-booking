using Microsoft.AspNetCore.Identity;
using VehicleService.API.DTOs.Auth;
using VehicleService.API.Models;
using VehicleService.API.Repositories.Interfaces;
using VehicleService.API.Security;
using VehicleService.API.Services.Interfaces;
using VehicleService.Repositories.Interfaces;

namespace VehicleService.API.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordResetTokenRepository _tokenRepository;
        private readonly IUserService _userService;
        private readonly IEmailService _emailService;
        private readonly JwtTokenUtil _jwtTokenUtil;
        private readonly PasswordHasher<User> _passwordHasher;

        public AuthService(
            IUserRepository userRepository,
            IPasswordResetTokenRepository tokenRepository,
            IUserService userService,
            IEmailService emailService,
            JwtTokenUtil jwtTokenUtil
        )
        {
            _userRepository = userRepository;
            _tokenRepository = tokenRepository;
            _userService = userService;
            _emailService = emailService;
            _jwtTokenUtil = jwtTokenUtil;
            _passwordHasher = new PasswordHasher<User>();
        }

        // LOGIN
        public async Task<AuthResponse> LoginAsync(AuthRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email)
                       ?? throw new Exception("Invalid email or password");

            if (!user.IsActive)
                throw new Exception("Account is deleted or inactive");

            var result = _passwordHasher.VerifyHashedPassword(
                user,
                user.Password,
                request.Password
            );

            if (result == PasswordVerificationResult.Failed)
                throw new Exception("Invalid email or password");

            var token = _jwtTokenUtil.GenerateToken(user);

            return new AuthResponse
            {
                Token = token,
                TokenType = "Bearer",
                Email = user.Email,
                Role = user.Role.ToString(),
                FirstName = user.FirstName,
                LastName = user.LastName,
                Phone = user.Phone
            };
        }

        //  REGISTER
        public async Task RegisterAsync(RegisterRequest request)
        {
            var exists = await _userRepository.ExistsByEmailAsync(request.Email);
            if (exists)
                throw new Exception("Email already registered");

            var user = new User
            {
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Phone = request.Phone,
                Role = UserRole.CUSTOMER,
                IsActive = true,
                 CreatedAt = DateTime.UtcNow,   
                UpdatedAt = DateTime.UtcNow
            };

            user.Password = _passwordHasher.HashPassword(user, request.Password);

            await _userRepository.AddAsync(user);
        }

        // REFRESH TOKEN
        public async Task<AuthResponse> RefreshTokenAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email)
                       ?? throw new Exception("User not found");

            var token = _jwtTokenUtil.GenerateToken(user);

            return new AuthResponse
            {
                Token = token,
                TokenType = "Bearer",
                Email = user.Email,
                Role = user.Role.ToString(),
                FirstName = user.FirstName,
                LastName = user.LastName,
                Phone = user.Phone
            };
        }

        // FORGOT PASSWORD 
        public async Task ForgotPasswordAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email)
                       ?? throw new Exception("User not found with this email");

            var resetToken =
                await _tokenRepository.GetByUserAsync(user)
                ?? new PasswordResetToken();

            resetToken.User = user;
            resetToken.Token = Guid.NewGuid().ToString();
            resetToken.ExpiryTime = DateTime.UtcNow.AddMinutes(15);

            await _tokenRepository.SaveAsync(resetToken);

            var resetLink =
                $"http://localhost:3000/reset-password?token={resetToken.Token}";

            await _emailService.SendMailAsync(
                user.Email,
                "Reset Your Password",
                $"Click the link to reset password:\n\n{resetLink}\n\nLink valid for 15 minutes."
            );
        }

        public async Task ResetPasswordAsync(string token, string newPassword)
        {
            var resetToken = await _tokenRepository.GetByTokenAsync(token);

            if (resetToken == null)
                throw new Exception("Invalid reset token");

            if (resetToken.ExpiryTime < DateTime.UtcNow)
                throw new Exception("Reset token expired");

            var user = resetToken.User;

            user.Password = _passwordHasher.HashPassword(user, newPassword);
            user.UpdatedAt = DateTime.UtcNow;

            await _userRepository.UpdateAsync(user);

            // delete token after successful reset
            await _tokenRepository.DeleteAsync(resetToken);
        }

    }
}
