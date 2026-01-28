using Microsoft.Extensions.Configuration;
using VehicleService.API.DTOs;
using VehicleService.API.DTOs.User;
using VehicleService.API.Exceptions;
using VehicleService.API.Models;
using VehicleService.API.Repositories.Interfaces;
using VehicleService.API.Services.Interfaces;
using VehicleService.Repositories.Interfaces;

namespace VehicleService.API.Services.Implementations
{
    public class MechanicService : IMechanicService
    {
        private readonly IMechanicRepository _mechanicRepository;
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public MechanicService(
            IMechanicRepository mechanicRepository,
            IUserRepository userRepository,
            IUserService userService,
            IConfiguration configuration)
        {
            _mechanicRepository = mechanicRepository;
            _userRepository = userRepository;
            _userService = userService;
            _configuration = configuration;
        }

        // ================= CREATE MECHANIC =================
        public async Task<MechanicDTO> CreateMechanicAsync(
            MechanicDTO.CreateMechanicRequest request)
        {
            var defaultPassword =
                _configuration["AppSettings:DefaultMechanicPassword"];

            // 1️⃣ Create User
            var userRequest = new UserDTO.CreateUserRequest
            {
                Email = request.Email,
                Password = defaultPassword!,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Phone = request.Phone
            };

            var user = await _userService.RegisterUserAsync(
                userRequest,
                UserRole.MECHANIC
            );

            // 2️⃣ Create Mechanic
            var mechanic = new Mechanic
            {
                UserId = user.Id,
                User = user,
                SkillLevel = request.SkillLevel,
                Specialization = request.Specialization,
                ExperienceYears = request.ExperienceYears,
                IsAvailable = true,
                IsVerified = false
            };
           

            await _mechanicRepository.AddAsync(mechanic);
            return MapToDTO(mechanic);
        }

        // ================= READ =================
        public async Task<List<MechanicDTO>> GetAllMechanicsAsync()
        {
            return (await _mechanicRepository.GetAllAsync())
                .Select(MapToDTO)
                .ToList();
        }

        public async Task<MechanicDTO> GetMechanicByIdAsync(long id)
        {
            var mechanic = await _mechanicRepository.GetByIdAsync(id)
                ?? throw new Exception("Mechanic not found");

            return MapToDTO(mechanic);
        }

        public async Task<MechanicDTO> GetMechanicByEmailAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email)
                ?? throw new Exception("User not found");

            var mechanic = await _mechanicRepository.GetByUserIdAsync(user.Id)
                ?? throw new Exception("Mechanic not found");

            return MapToDTO(mechanic);
        }

        // ================= UPDATE =================
        public async Task<MechanicDTO> UpdateMechanicAsync(
            long id,
            MechanicDTO.UpdateMechanicRequest request)
        {
            var mechanic = await _mechanicRepository.GetByIdAsync(id)
                ?? throw new Exception("Mechanic not found");

            if (request.SkillLevel != null)
                mechanic.SkillLevel = request.SkillLevel.Value;

            if (request.Specialization != null)
                mechanic.Specialization = request.Specialization;

            if (request.IsAvailable.HasValue)
                mechanic.IsAvailable = request.IsAvailable.Value;

            if (request.MaxJobs.HasValue)
                mechanic.MaxJobs = request.MaxJobs.Value;

            if (request.ExperienceYears.HasValue)
                mechanic.ExperienceYears = request.ExperienceYears.Value;

            if (request.IsVerified.HasValue)
                mechanic.IsVerified = request.IsVerified.Value;

            await _mechanicRepository.UpdateAsync(mechanic);
            return MapToDTO(mechanic);
        }

        // ================= TOGGLE =================
        public async Task<MechanicDTO> ToggleMechanicAvailabilityAsync(long id)
        {
            var mechanic = await _mechanicRepository.GetByIdAsync(id)
                ?? throw new Exception("Mechanic not found");

            mechanic.IsAvailable = !mechanic.IsAvailable;
            await _mechanicRepository.UpdateAsync(mechanic);

            return MapToDTO(mechanic);
        }

        // ================= AVAILABLE =================
        public async Task<List<MechanicDTO>> GetAvailableMechanicsAsync()
        {
            return (await _mechanicRepository.GetAvailableAsync())
                .Select(MapToDTO)
                .ToList();
        }

        public async Task<long> CountAvailableMechanicsAsync()
        {
            return await _mechanicRepository.CountAvailableAsync();
        }

        // ================= MAPPER =================
        private static MechanicDTO MapToDTO(Mechanic mechanic)
        {
            return new MechanicDTO
            {
                Id = mechanic.Id,
                User = new UserDTO
                {
                    Id = mechanic.User.Id,
                    Email = mechanic.User.Email,
                    FirstName = mechanic.User.FirstName,
                    LastName = mechanic.User.LastName,
                    Phone = mechanic.User.Phone
                },
                SkillLevel = mechanic.SkillLevel,
                Specialization = mechanic.Specialization,
                IsAvailable = mechanic.IsAvailable,
                CurrentJobCount = mechanic.CurrentJobCount,
                MaxJobs = mechanic.MaxJobs,
                Rating = mechanic.Rating,
                TotalJobsCompleted = mechanic.TotalJobsCompleted,
                ExperienceYears = mechanic.ExperienceYears,
                IsVerified = mechanic.IsVerified
            };
        }

     
    }
}
