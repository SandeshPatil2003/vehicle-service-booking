using Microsoft.EntityFrameworkCore;
using VehicleService.API.Data;
using VehicleService.API.Models;
using VehicleService.API.Repositories.Interfaces;

namespace VehicleService.API.Repositories.Implementations
{
    public class PasswordResetTokenRepository : IPasswordResetTokenRepository
    {
        private readonly ApplicationDbContext _context;

        public PasswordResetTokenRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PasswordResetToken?> GetByTokenAsync(string token)
        {
            return await _context.PasswordResetTokens
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.Token == token);
        }

        public async Task<PasswordResetToken?> GetByUserIdAsync(long userId)
        {
            return await _context.PasswordResetTokens
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.UserId == userId);
        }

        public async Task DeleteByUserIdAsync(long userId)
        {
            var tokens = await _context.PasswordResetTokens
                .Where(t => t.UserId == userId)
                .ToListAsync();

            if (tokens.Any())
            {
                _context.PasswordResetTokens.RemoveRange(tokens);
            }
        }

        public async Task AddAsync(PasswordResetToken token)
        {
            await _context.PasswordResetTokens.AddAsync(token);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        // IRepository
        public async Task<PasswordResetToken?> GetByIdAsync(long id) =>
            await _context.PasswordResetTokens.FindAsync(id);

        public async Task<List<PasswordResetToken>> GetAllAsync() =>
            await _context.PasswordResetTokens.ToListAsync();

   /*     public async Task AddAsync(PasswordResetToken token)
        {
            _context.PasswordResetTokens.Add(token);
            await _context.SaveChangesAsync();
        }*/

        public async Task UpdateAsync(PasswordResetToken token)
        {
            _context.PasswordResetTokens.Update(token);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(PasswordResetToken token)
        {
            _context.PasswordResetTokens.Remove(token);
            await _context.SaveChangesAsync();
        }

        public async Task<PasswordResetToken?> GetByUserAsync(User user)
        {
            return await _context.PasswordResetTokens
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.UserId == user.Id);
        }

        // ✅ REQUIRED BY INTERFACE
        public async Task SaveAsync(PasswordResetToken token)
        {
            if (token.Id == 0)
                await _context.PasswordResetTokens.AddAsync(token);
            else
                _context.PasswordResetTokens.Update(token);

            await _context.SaveChangesAsync();
        }
    }
}
