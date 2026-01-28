using VehicleService.API.DTOs;
using VehicleService.API.DTOs.User;
using VehicleService.API.Models;
using VehicleService.Repositories.Interfaces;

namespace VehicleService.API.Services.Interfaces
{
    public interface IUserService
    {
        Task<User> LoadUserByEmailAsync(string email);
        Task<User> RegisterUserAsync(UserDTO.CreateUserRequest request, UserRole role);

        Task<UserDTO> GetUserProfileAsync(string email);
        Task<UserDTO> UpdateUserProfileAsync(string email, UserDTO.ProfileUpdateRequest request);
        Task ChangePasswordAsync(string email, string currentPassword, string newPassword);

        Task<List<UserDTO>> GetAllUsersAsync();
        Task<List<UserDTO>> GetUsersByRoleAsync(UserRole role);
        Task<UserDTO> ToggleUserStatusAsync(long userId);

        Task<User> FindByEmailAsync(string email);
        Task DeleteUserAccountAsync(string email);
        Task<long> CountUsersByRoleAsync(UserRole role);
    }
}
