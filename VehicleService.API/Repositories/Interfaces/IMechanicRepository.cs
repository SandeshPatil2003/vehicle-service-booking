using VehicleService.API.Models;
using VehicleService.API.Enums;
using VehicleService.Models;

namespace VehicleService.API.Repositories.Interfaces
{
    public interface IMechanicRepository : IRepository<Mechanic>
    {
        Task<Mechanic?> GetByIdAsync(long id);
        Task<Mechanic?> GetByUserIdAsync(long userId);
        Task<Mechanic?> GetByUserAsync(User user);

        Task<List<Mechanic>> GetAvailableMechanicsAsync();
        Task<List<Mechanic>> GetAvailableAndNotFullAsync();
        Task<List<Mechanic>> GetAvailableBySkillAsync(SkillLevel skillLevel);

        Task<List<Mechanic>> SearchMechanicsAsync(string search);

        Task<long> CountByAvailabilityAsync(bool isAvailable);

        Task AddAsync(Mechanic mechanic);
        Task UpdateAsync(Mechanic mechanic);
        Task SaveChangesAsync();


        Task<long> CountAvailableAsync();
        Task<List<Mechanic>> GetAvailableAsync();
    }
}
