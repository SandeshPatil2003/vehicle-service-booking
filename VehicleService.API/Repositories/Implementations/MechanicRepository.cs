using Microsoft.EntityFrameworkCore;
using VehicleService.API.Data;
using VehicleService.API.Enums;
using VehicleService.API.Models;
using VehicleService.API.Repositories.Interfaces;

namespace VehicleService.API.Repositories.Implementations
{
    public class MechanicRepository : IMechanicRepository
    {
        private readonly ApplicationDbContext _context;

        public MechanicRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Mechanic?> GetByIdAsync(long id)
        {
            return await _context.Mechanics
                .Include(m => m.User)
                .FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<Mechanic?> GetByUserAsync(User user)
        {
            return await _context.Mechanics
                .Include(m => m.User)
                .FirstOrDefaultAsync(m => m.UserId == user.Id);
        }

        public async Task<Mechanic?> GetByUserIdAsync(long userId)
        {
            return await _context.Mechanics
                .Include(m => m.User)
                .FirstOrDefaultAsync(m => m.UserId == userId);
        }

        public async Task<List<Mechanic>> GetAvailableMechanicsAsync()
        {
            return await _context.Mechanics

                .Where(m => m.IsAvailable)
                .ToListAsync();
        }

        public async Task<List<Mechanic>> GetAvailableAndNotFullAsync()
        {
            return await _context.Mechanics
                .Include(m => m.User)
                .Where(m => m.IsAvailable && m.CurrentJobCount < m.MaxJobs)
                .ToListAsync();
        }

        public async Task<List<Mechanic>> GetAvailableBySkillAsync(SkillLevel skillLevel)
        {
            return await _context.Mechanics
                 .Include(m => m.User)
                .Where(m =>
                    m.SkillLevel == skillLevel &&
                    m.IsAvailable &&
                    m.CurrentJobCount < m.MaxJobs &&
                    m.SkillLevel == skillLevel)
                .OrderBy(m => m.CurrentJobCount)
                .ToListAsync();
        }

        public async Task<List<Mechanic>> SearchMechanicsAsync(string search)
        {
            return await _context.Mechanics
                .Include(m => m.User)
                .Where(m =>
                    m.User.FirstName.Contains(search) ||
                    m.User.LastName.Contains(search) ||
                    m.Specialization.Contains(search))
                .ToListAsync();
        }

        public async Task<long> CountByAvailabilityAsync(bool isAvailable)
        {
            return await _context.Mechanics
                .LongCountAsync(m => m.IsAvailable == isAvailable);
        }

        public async Task AddAsync(Mechanic mechanic)
        {
            await _context.Mechanics.AddAsync(mechanic);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Mechanic mechanic)
        {
            _context.Mechanics.Update(mechanic);
            await Task.CompletedTask;
            await _context.SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }



        // ===== IRepository =====
      /*  public async Task<Mechanic?> GetByIdAsync(long id) =>
            await _context.Mechanics
                .Include(m => m.User)
                .FirstOrDefaultAsync(m => m.Id == id);
*/
        public async Task<List<Mechanic>> GetAllAsync() =>
            await _context.Mechanics
                .Include(m => m.User)
                .ToListAsync();

    /*    public async Task AddAsync(Mechanic mechanic)
        {
            _context.Mechanics.Add(mechanic);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Mechanic mechanic)
        {
            _context.Mechanics.Update(mechanic);
            await _context.SaveChangesAsync();
        }*/

        public async Task DeleteAsync(Mechanic mechanic)
        {
            _context.Mechanics.Remove(mechanic);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Mechanic>> GetAvailableAsync()
        {
            return await _context.Mechanics
                .Include(m => m.User)
                .Where(m => m.IsAvailable)
                .ToListAsync();
        }

        public async Task<long> CountAvailableAsync()
        {
            return await _context.Mechanics
                .LongCountAsync(m => m.IsAvailable);
        }

    }
}
