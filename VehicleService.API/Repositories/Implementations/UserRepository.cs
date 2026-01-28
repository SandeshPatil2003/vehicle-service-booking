using Microsoft.EntityFrameworkCore;
using VehicleService.API.Data;
using VehicleService.API.Models;
using VehicleService.API.Data;
using VehicleService.Models;
using VehicleService.Repositories.Interfaces;

namespace VehicleService.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByIdAsync(long id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email && u.IsActive);
        }

        public async Task<bool> ExistsByEmailAsync(string email)
        {
            return await _context.Users
                .AnyAsync(u => u.Email == email);
        }

        public async Task<List<User>> GetByRoleAsync(UserRole role)
        {
            return await _context.Users
                .Where(u => u.Role == role)
                .ToListAsync();
        }

        public async Task<List<User>> GetActiveUsersByRoleAsync(UserRole role)
        {
            return await _context.Users
                .Where(u => u.IsActive && u.Role == role)
                .ToListAsync();
        }

        public async Task<long> CountByRoleAsync(UserRole role)
        {
            return await _context.Users
                .LongCountAsync(u => u.Role == role);
        }

        public async Task<List<User>> SearchUsersAsync(string search)
        {
            return await _context.Users
                .Where(u =>
                    u.Email.Contains(search) ||
                    u.FirstName.Contains(search) ||
                    u.LastName.Contains(search))
                .ToListAsync();
        }

        public async Task<User?> GetByResetTokenAsync(string resetToken)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.ResetToken == resetToken);
        }

        public async Task AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public void Update(User user)
        {
            _context.Users.Update(user);
        }

        public void Delete(User user)
        {
            _context.Users.Remove(user);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

 /*       public async Task<User?> GetByIdAsync(long id) =>
        await _context.Users.FindAsync(id);*/

        public async Task<List<User>> GetAllAsync() =>
            await _context.Users.ToListAsync();

    /*    public async Task<User?> GetByEmailAsync(string email) =>
            await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

        public async Task<bool> ExistsByEmailAsync(string email) =>
            await _context.Users.AnyAsync(u => u.Email == email);

        public async Task AddAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }*/

        public async Task UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

    }
}
