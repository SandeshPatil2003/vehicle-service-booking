using VehicleService.API.Models;
using VehicleService.API.Repositories.Interfaces;
using VehicleService.Models;

namespace VehicleService.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByIdAsync(long id);

        Task<User?> GetByEmailAsync(string email);

        Task<bool> ExistsByEmailAsync(string email);

        Task<List<User>> GetByRoleAsync(UserRole role);

        Task<List<User>> GetActiveUsersByRoleAsync(UserRole role);

        Task<long> CountByRoleAsync(UserRole role);

        Task<List<User>> SearchUsersAsync(string search);

        Task<User?> GetByResetTokenAsync(string resetToken);

        Task AddAsync(User user);

        void Update(User user);

        void Delete(User user);

        Task SaveChangesAsync();
    }

    public enum UserRole
    {
        CUSTOMER,
        MECHANIC,
        ADMIN
    }
}
