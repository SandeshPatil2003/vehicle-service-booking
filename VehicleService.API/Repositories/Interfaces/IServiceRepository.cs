using VehicleService.Models;
using VehicleService.API.Enums;
using VehicleService.API.Models;
using VehicleService.API.Repositories.Interfaces;

namespace VehicleService.Repositories.Interfaces
{
    public interface IServiceRepository : IRepository<Service>
    {
        Task<Service?> GetByIdAsync(long id);

        Task<List<Service>> GetAllActiveAsync();

        Task<List<Service>> GetActiveAsync();

        Task<List<Service>> GetActiveBySkillLevelAsync(SkillLevel skillLevel);

        Task<List<Service>> SearchServicesAsync(string search);

        Task<long> CountActiveAsync();



        Task AddAsync(Service service);

        void Update(Service service);

        void Delete(Service service);

        Task SaveChangesAsync();
    }
}
