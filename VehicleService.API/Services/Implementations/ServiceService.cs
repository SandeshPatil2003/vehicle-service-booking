using VehicleService.API.DTOs;
using VehicleService.API.Models;
using VehicleService.API.Repositories.Interfaces;
using VehicleService.API.Services.Interfaces;
using VehicleService.Repositories.Interfaces;

namespace VehicleService.API.Services.Implementations
{
    public class ServiceService : IServiceService
    {
        private readonly IServiceRepository _serviceRepository;

        public ServiceService(IServiceRepository serviceRepository)
        {
            _serviceRepository = serviceRepository;
        }

        // ================= GET ALL ACTIVE SERVICES =================
        public async Task<List<ServiceDTO>> GetAllServicesAsync()
        {
            var services = await _serviceRepository.GetActiveAsync();

            return services
                .Select(MapToDTO)
                .ToList();
        }

        // ================= GET BY ID =================
        public async Task<ServiceDTO> GetServiceByIdAsync(long id)
        {
            var service = await _serviceRepository.GetByIdAsync(id)
                ?? throw new Exception($"Service not found with id: {id}");

            return MapToDTO(service);
        }

        // ================= CREATE =================
        public async Task<ServiceDTO> CreateServiceAsync(
            ServiceDTO.CreateServiceRequest request)
        {
            var service = new Service
            {
                Name = request.Name,
                Description = request.Description,
                BasePrice = request.BasePrice,
                DurationMinutes = request.DurationMinutes,
                RequiredSkill = request.RequiredSkill,
                IsActive = true
            };

            await _serviceRepository.AddAsync(service);
            await _serviceRepository.SaveChangesAsync();
            return MapToDTO(service);
        }

        // ================= UPDATE =================
        public async Task<ServiceDTO> UpdateServiceAsync(
            long id,
            ServiceDTO.UpdateServiceRequest request)
        {
            var service = await _serviceRepository.GetByIdAsync(id)
                ?? throw new Exception($"Service not found with id: {id}");

            if (request.Name != null)
                service.Name = request.Name;

            if (request.Description != null)
                service.Description = request.Description;

            if (request.BasePrice.HasValue)
                service.BasePrice = request.BasePrice.Value;

            if (request.DurationMinutes.HasValue)
                service.DurationMinutes = request.DurationMinutes.Value;

            if (request.RequiredSkill.HasValue)
                service.RequiredSkill = request.RequiredSkill.Value;

            if (request.IsActive.HasValue)
                service.IsActive = request.IsActive.Value;

            await _serviceRepository.UpdateAsync(service);
            return MapToDTO(service);
        }

        // ================= DELETE =================
        public async Task DeleteServiceAsync(long id)
        {
            var service = await _serviceRepository.GetByIdAsync(id)
                ?? throw new Exception($"Service not found with id: {id}");

            await _serviceRepository.DeleteAsync(service);
        }

        // ================= TOGGLE ACTIVE =================
        public async Task<ServiceDTO> ToggleServiceStatusAsync(long id)
        {
            var service = await _serviceRepository.GetByIdAsync(id)
                ?? throw new Exception($"Service not found with id: {id}");

            service.IsActive = !service.IsActive;
            await _serviceRepository.UpdateAsync(service);

            return MapToDTO(service);
        }

        // ================= COUNT =================
        public async Task<long> CountActiveServicesAsync()
        {
            return await _serviceRepository.CountActiveAsync();
        }

        // ================= MAPPER =================
        private static ServiceDTO MapToDTO(Service service)
        {
            return new ServiceDTO
            {
                Id = service.Id,
                Name = service.Name,
                Description = service.Description,
                BasePrice = service.BasePrice,
                DurationMinutes = service.DurationMinutes,
                RequiredSkill = service.RequiredSkill,
                IsActive = service.IsActive
            };
        }
    }
}
