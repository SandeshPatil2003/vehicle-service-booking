using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleService.API.Models
{
    [Table("password_reset_tokens")]
    public class PasswordResetToken
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        [Column("token")]
        public string Token { get; set; }

        // One-to-One with User
        [Required]
        [Column("user_id")]
        public long UserId { get; set; }

       [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        [Required]
        [Column("expiry_time")]
        public DateTime ExpiryTime { get; set; }
    }
}
