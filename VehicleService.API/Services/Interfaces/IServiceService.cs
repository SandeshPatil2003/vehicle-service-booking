using VehicleService.API.DTOs;

namespace VehicleService.API.Services.Interfaces
{
    public interface IServiceService
    {
        Task<List<ServiceDTO>> GetAllServicesAsync();
        Task<ServiceDTO> GetServiceByIdAsync(long id);

        Task<ServiceDTO> CreateServiceAsync(ServiceDTO.CreateServiceRequest request);
        Task<ServiceDTO> UpdateServiceAsync(long id, ServiceDTO.UpdateServiceRequest request);

        Task DeleteServiceAsync(long id);
        Task<ServiceDTO> ToggleServiceStatusAsync(long id);

        Task<long> CountActiveServicesAsync();
    }
}
