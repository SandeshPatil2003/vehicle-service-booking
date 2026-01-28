using VehicleService.API.DTOs.User;
using VehicleService.API.Enums;
using static VehicleService.API.DTOs.Booking.BookingResponse;

namespace VehicleService.API.DTOs
{
    public class MechanicDTO
    {
        public long Id { get; set; }
        public UserDTO User { get; set; } = null!;
        public SkillLevel SkillLevel { get; set; }
        public string? Specialization { get; set; }
        public bool IsAvailable { get; set; }
        public int CurrentJobCount { get; set; }
        public int MaxJobs { get; set; }
        public double Rating { get; set; }
        public int TotalJobsCompleted { get; set; }
        public int ExperienceYears { get; set; }
        public bool IsVerified { get; set; }

        // =========================
        // Create Mechanic (Admin)
        // =========================
        public class CreateMechanicRequest
        {
            public string Email { get; set; } = string.Empty;
            public string FirstName { get; set; } = string.Empty;
            public string LastName { get; set; } = string.Empty;
            public string? Phone { get; set; }
            public SkillLevel SkillLevel { get; set; }
            public string? Specialization { get; set; }
            public int ExperienceYears { get; set; }
        }

        // =========================
        // Update Mechanic (Admin)
        // =========================
        public class UpdateMechanicRequest
        {
            public SkillLevel? SkillLevel { get; set; }
            public string? Specialization { get; set; }
            public bool? IsAvailable { get; set; }
            public int? MaxJobs { get; set; }
            public int? ExperienceYears { get; set; }
            public bool? IsVerified { get; set; }
        }
    }
}
