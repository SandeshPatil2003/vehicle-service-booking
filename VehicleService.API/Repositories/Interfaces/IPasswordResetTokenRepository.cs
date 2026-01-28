using VehicleService.API.Models;

namespace VehicleService.API.Repositories.Interfaces
{
    public interface IPasswordResetTokenRepository : IRepository<PasswordResetToken>
    {
        Task<PasswordResetToken?> GetByTokenAsync(string token);
        Task<PasswordResetToken?> GetByUserIdAsync(long userId);
        Task DeleteByUserIdAsync(long userId);
        Task AddAsync(PasswordResetToken token);
        Task SaveChangesAsync();

        Task<PasswordResetToken?> GetByUserAsync(User user);
        Task SaveAsync(PasswordResetToken token);

    }
}
