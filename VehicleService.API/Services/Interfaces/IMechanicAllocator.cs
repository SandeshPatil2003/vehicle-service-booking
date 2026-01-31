namespace VehicleService.API.Services.Interfaces
{
    public interface IMechanicAllocator
    {
        Task AllocatePendingBookingsAsync();
    }
}
