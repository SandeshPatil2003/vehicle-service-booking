using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VehicleService.Repositories.Interfaces;

namespace VehicleService.API.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [MaxLength(255)]
        public string Password { get; set; }

        [Required]
        [MaxLength(50)]
        [Column("first_name")]
        public string? FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        [Column("last_name")]
        public string? LastName { get; set; }

        [MaxLength(20)]
        public string? Phone { get; set; }

        [Required]
        public UserRole Role { get; set; } = UserRole.CUSTOMER;

        [Column("is_active")]
        public bool IsActive { get; set; } = true;

        [Column("created_at")]
        public DateTime? CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }

        [Column("reset_token")]
        public string? ResetToken { get; set; }

        [Column("reset_token_expiry")]
        public DateTime? ResetTokenExpiry { get; set; }

        /*public PasswordResetToken PasswordResetToken { get; set; }*/

        public Mechanic Mechanic { get; set; }


        // Automatically set timestamps
        public void OnCreate()
        {
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }

        public void OnUpdate()
        {
            UpdatedAt = DateTime.UtcNow;
        }

       /* public ICollection<PasswordResetToken> PasswordResetTokens { get; set; }
       = new List<PasswordResetToken>();*/
    }

  
}
