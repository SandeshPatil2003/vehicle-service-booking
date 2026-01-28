using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleService.API.DTOs;
using VehicleService.API.Services.Interfaces;

namespace VehicleService.API.Controllers
{
    [ApiController]
    [Route("api/admin/services")]
    [Authorize(Roles = "ADMIN")]
    public class AdminServiceController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public AdminServiceController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        // =========================
        // CREATE SERVICE
        // =========================
        [HttpPost]
        public async Task<ActionResult<ServiceDTO>> CreateService(
            [FromBody] ServiceDTO.CreateServiceRequest request)
        {
            var service = await _serviceService.CreateServiceAsync(request);
            return CreatedAtAction(
                nameof(CreateService),
                new { id = service.Id },
                service
            );
        }

        // =========================
        // UPDATE SERVICE
        // =========================
        [HttpPut("{id:long}")]
        public async Task<ActionResult<ServiceDTO>> UpdateService(
            long id,
            [FromBody] ServiceDTO.UpdateServiceRequest request)
        {
            var service = await _serviceService.UpdateServiceAsync(id, request);
            return Ok(service);
        }

        // =========================
        // DELETE SERVICE
        // =========================
        [HttpDelete("{id:long}")]
        public async Task<IActionResult> DeleteService(long id)
        {
            await _serviceService.DeleteServiceAsync(id);
            return Ok("Service deleted successfully");
        }

        // =========================
        // TOGGLE SERVICE STATUS
        // =========================
        [HttpPut("{id:long}/toggle-status")]
        public async Task<ActionResult<ServiceDTO>> ToggleServiceStatus(long id)
        {
            var service = await _serviceService.ToggleServiceStatusAsync(id);
            return Ok(service);
        }
    }
}
