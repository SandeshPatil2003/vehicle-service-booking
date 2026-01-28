using Microsoft.EntityFrameworkCore;
using VehicleService.API.Data;
using VehicleService.API.Models;
using VehicleService.API.Data;
using VehicleService.API.Enums;
using VehicleService.Models;
using VehicleService.Repositories.Interfaces;

namespace VehicleService.Repositories.Implementations
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly ApplicationDbContext _context;

        public ServiceRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Service?> GetByIdAsync(long id)
        {
            return await _context.Services.FindAsync(id);
        }

        public async Task<List<Service>> GetAllActiveAsync()
        {
            return await _context.Services
                .Where(s => s.IsActive)
                .ToListAsync();
        }

        public async Task<List<Service>> GetActiveBySkillLevelAsync(SkillLevel skillLevel)
        {
            return await _context.Services
                .Where(s => s.IsActive && s.RequiredSkill == skillLevel)
                .ToListAsync();
        }

        public async Task<List<Service>> SearchServicesAsync(string search)
        {
            return await _context.Services
                .Where(s =>
                    s.Name.Contains(search) ||
                    s.Description.Contains(search))
                .ToListAsync();
        }

        public async Task<long> CountActiveAsync()
        {
            return await _context.Services
                .LongCountAsync(s => s.IsActive);
        }

        public async Task AddAsync(Service service)
        {
            await _context.Services.AddAsync(service);
        }

        public void Update(Service service)
        {
            _context.Services.Update(service);
        }

        public void Delete(Service service)
        {
            _context.Services.Remove(service);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }


       /* public async Task<Service?> GetByIdAsync(long id) =>
       await _context.Services.FindAsync(id);*/

        public async Task<List<Service>> GetAllAsync() =>
            await _context.Services.ToListAsync();

        public async Task<List<Service>> GetActiveAsync() =>
            await _context.Services
                .Where(s => s.IsActive)
                .ToListAsync();
/*
        public async Task AddAsync(Service service)
        {
            _context.Services.Add(service);
            await _context.SaveChangesAsync();
        }*/

        public async Task UpdateAsync(Service service)
        {
            _context.Services.Update(service);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Service service)
        {
            _context.Services.Remove(service);
            await _context.SaveChangesAsync();
        }
    }
}
