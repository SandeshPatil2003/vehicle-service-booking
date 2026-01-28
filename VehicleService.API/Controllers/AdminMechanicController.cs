using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleService.API.DTOs;
using VehicleService.API.Services.Interfaces;

namespace VehicleService.API.Controllers
{
    [ApiController]
    [Route("api/admin/mechanics")]
    [Authorize(Roles = "ADMIN")]
    public class AdminMechanicController : ControllerBase
    {
        private readonly IMechanicService _mechanicService;

        public AdminMechanicController(IMechanicService mechanicService)
        {
            _mechanicService = mechanicService;
        }

        // GET: api/admin/mechanics
        [HttpGet]
        public async Task<IActionResult> GetAllMechanics()
        {
            var mechanics = await _mechanicService.GetAllMechanicsAsync();
            return Ok(mechanics);
        }

        // POST: api/admin/mechanics
        [HttpPost]
        public async Task<IActionResult> CreateMechanic(
            [FromBody] MechanicDTO.CreateMechanicRequest request)
        {
            var mechanic = await _mechanicService.CreateMechanicAsync(request);
           // var response = await _mechanicService.GetByIdAsync(mechanic.Id);
            return Ok(mechanic);
        }
    }
}
