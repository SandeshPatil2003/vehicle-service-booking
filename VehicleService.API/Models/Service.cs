using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VehicleService.API.Enums;

namespace VehicleService.API.Models
{
    [Table("services")]
    public class Service
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        [Column("base_price", TypeName = "decimal(10,2)")]
        [Range(0.01, double.MaxValue)]
        public decimal BasePrice { get; set; }

        [Required]
        [Column("duration_minutes")]
        [Range(1, int.MaxValue)]
        public int DurationMinutes { get; set; }

        [Required]
        [Column("required_skill")]
        public SkillLevel RequiredSkill { get; set; } = SkillLevel.BASIC;

        [Column("is_active")]
        public bool IsActive { get; set; } = true;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        public void OnCreate()
        {
            CreatedAt = DateTime.UtcNow;
        }
    }

   /* public enum SkillLevel
    {
        BASIC,
        INTERMEDIATE,
        ADVANCED
    }*/
}
