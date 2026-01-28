using Microsoft.AspNetCore.Identity;
using VehicleService.API.DTOs;
using VehicleService.API.DTOs.User;
using VehicleService.API.Exceptions;
using VehicleService.API.Models;
using VehicleService.API.Repositories.Interfaces;
using VehicleService.API.Services.Interfaces;
using VehicleService.Repositories.Interfaces;

namespace VehicleService.API.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly PasswordHasher<User> _passwordHasher;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _passwordHasher = new PasswordHasher<User>();
        }

        // ✅ Equivalent to UserDetailsService.loadUserByUsername
        public async Task<User> LoadUserByEmailAsync(string email)
        {
            return await _userRepository.GetByEmailAsync(email)
                   ?? throw new ResourceNotFoundException($"User not found with email: {email}");
        }

        // ✅ Register user
        public async Task<User> RegisterUserAsync(UserDTO.CreateUserRequest request, UserRole role)
        {
            if (await _userRepository.ExistsByEmailAsync(request.Email))
                throw new ArgumentException("Email already registered");

            var user = new User
            {
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Phone = request.Phone,
                Role = role,
                IsActive = true,
                
            };
            user.OnCreate();

            user.Password = _passwordHasher.HashPassword(user, request.Password);

            await _userRepository.AddAsync(user);
            return user;
        }

        // ✅ Profile
        public async Task<UserDTO> GetUserProfileAsync(string email)
        {
            var user = await FindByEmailAsync(email);
            return ConvertToDTO(user);
        }

        public async Task<UserDTO> UpdateUserProfileAsync(string email, UserDTO.ProfileUpdateRequest request)
        {
            var user = await FindByEmailAsync(email);

            if (!string.IsNullOrEmpty(request.FirstName))
                user.FirstName = request.FirstName;

            if (!string.IsNullOrEmpty(request.LastName))
                user.LastName = request.LastName;

            if (!string.IsNullOrEmpty(request.Phone))
                user.Phone = request.Phone;

            await _userRepository.UpdateAsync(user);
            return ConvertToDTO(user);
        }

        // ✅ Change password
        public async Task ChangePasswordAsync(string email, string currentPassword, string newPassword)
        {
            var user = await FindByEmailAsync(email);

            var result = _passwordHasher.VerifyHashedPassword(
                user,
                user.Password,
                currentPassword
            );

            if (result == PasswordVerificationResult.Failed)
                throw new ArgumentException("Current password is incorrect");

            user.Password = _passwordHasher.HashPassword(user, newPassword);
            await _userRepository.UpdateAsync(user);
        }

        // ✅ Admin methods
        public async Task<List<UserDTO>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return users.Select(ConvertToDTO).ToList();
        }

        public async Task<List<UserDTO>> GetUsersByRoleAsync(UserRole role)
        {
            var users = await _userRepository.GetByRoleAsync(role);
            return users.Select(ConvertToDTO).ToList();
        }

        public async Task<UserDTO> ToggleUserStatusAsync(long userId)
        {
            var user = await _userRepository.GetByIdAsync(userId)
                       ?? throw new ResourceNotFoundException("User not found");

            user.IsActive = !user.IsActive;
            await _userRepository.UpdateAsync(user);

            return ConvertToDTO(user);
        }

        // ✅ Required by AuthService
        public async Task<User> FindByEmailAsync(string email)
        {
            return await _userRepository.GetByEmailAsync(email)
                   ?? throw new ResourceNotFoundException("User not found");
        }

        // ✅ Soft delete
        public async Task DeleteUserAccountAsync(string email)
        {
            var user = await FindByEmailAsync(email);

            if (user.Role == UserRole.ADMIN)
                throw new InvalidOperationException("Admin account cannot be deleted");

            user.IsActive = false;
            await _userRepository.UpdateAsync(user);
        }

        public async Task<long> CountUsersByRoleAsync(UserRole role)
        {
            return await _userRepository.CountByRoleAsync(role);
        }

        // 🔁 DTO mapping
        private static UserDTO ConvertToDTO(User user)
        {
            return new UserDTO
            {
                /*Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Phone = user.Phone,
                Role = user.Role.ToString(),
                IsActive = user.IsActive,
                CreatedAt = user.CreatedAt ?? DateTime.UtcNow*/
                Id = user.Id,
                Email = user.Email ?? "",
                FirstName = user.FirstName ?? "",
                LastName = user.LastName ?? "",
                Phone = user.Phone ?? "",
                Role = user.Role.ToString(),
                IsActive = user.IsActive,
                CreatedAt = user.CreatedAt ?? DateTime.UtcNow
                //UpdatedAt = DateTime.UtcNow
            };
        }

      /*  Task<User> IUserService.RegisterUserAsync(UserDTO.CreateUserRequest request, UserRole role)
        {
            throw new NotImplementedException();
        }*/
    }
}
