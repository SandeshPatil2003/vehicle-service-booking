using VehicleService.API.DTOs;

namespace VehicleService.API.Services.Interfaces
{
    public interface IMechanicService
    {
        Task<MechanicDTO> CreateMechanicAsync(MechanicDTO.CreateMechanicRequest request);

        Task<List<MechanicDTO>> GetAllMechanicsAsync();
        Task<MechanicDTO> GetMechanicByIdAsync(long id);
        Task<MechanicDTO> GetMechanicByEmailAsync(string email);

        Task<MechanicDTO> UpdateMechanicAsync(
            long id,
            MechanicDTO.UpdateMechanicRequest request
        );

        Task<MechanicDTO> ToggleMechanicAvailabilityAsync(long id);

        Task<List<MechanicDTO>> GetAvailableMechanicsAsync();
        Task<long> CountAvailableMechanicsAsync();

/*        Task<MechanicDTO> GetByIdAsync(long id);*/
    }
}
