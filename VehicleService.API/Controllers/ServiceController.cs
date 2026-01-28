using Microsoft.AspNetCore.Mvc;
using VehicleService.API.DTOs;
using VehicleService.API.DTOs;
using VehicleService.API.Services.Interfaces;

namespace VehicleService.API.Controllers
{
    [ApiController]
    [Route("api/services")]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServiceController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        // =========================
        // GET ALL ACTIVE SERVICES
        // =========================
        [HttpGet]
        public async Task<ActionResult<List<ServiceDTO>>> GetAllServices()
        {
            var services = await _serviceService.GetAllServicesAsync();
            return Ok(services);
        }

        // =========================
        // GET SERVICE BY ID
        // =========================
        [HttpGet("{id:long}")]
        public async Task<ActionResult<ServiceDTO>> GetServiceById(long id)
        {
            var service = await _serviceService.GetServiceByIdAsync(id);
            return Ok(service);
        }
    }
}
