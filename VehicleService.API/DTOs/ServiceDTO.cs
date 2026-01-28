using System;
using VehicleService.API.Enums;

namespace VehicleService.API.DTOs
{
    public class ServiceDTO
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal BasePrice { get; set; }
        public int DurationMinutes { get; set; }
        public SkillLevel RequiredSkill { get; set; }
        public bool IsActive { get; set; }

        // =========================
        // Create Service (Admin)
        // =========================
        public class CreateServiceRequest
        {
            public string Name { get; set; } = string.Empty;
            public string? Description { get; set; }
            public decimal BasePrice { get; set; }
            public int DurationMinutes { get; set; }
            public SkillLevel RequiredSkill { get; set; }
        }

        // =========================
        // Update Service (Admin)
        // =========================
        public class UpdateServiceRequest
        {
            public string? Name { get; set; }
            public string? Description { get; set; }
            public decimal? BasePrice { get; set; }
            public int? DurationMinutes { get; set; }
            public SkillLevel? RequiredSkill { get; set; }
            public bool? IsActive { get; set; }
        }
    }
}
