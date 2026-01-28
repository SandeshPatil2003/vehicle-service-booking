using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VehicleService.API.Enums;

namespace VehicleService.API.Models
{
    [Table("mechanics")]
    public class Mechanic
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        // One-to-One with User
        [Required]
        [Column("user_id")]
        public long UserId { get; set; }

        public User User { get; set; }

        [Required]
        [Column("skill_level")]
        public SkillLevel SkillLevel { get; set; } = SkillLevel.BASIC;

        [MaxLength(100)]
        public string? Specialization { get; set; }

        [Column("is_available")]
        public bool IsAvailable { get; set; } = true;

        [Column("current_job_count")]
        public int CurrentJobCount { get; set; } = 0;

        [Column("max_jobs")]
        public int MaxJobs { get; set; } = 3;

        public double Rating { get; set; } = 0.0;

        [Column("total_jobs_completed")]
        public int TotalJobsCompleted { get; set; } = 0;

        [Column("experience_years")]
        public int ExperienceYears { get; set; } = 0;

        [Column("is_verified")]
        public bool IsVerified { get; set; } = false;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
