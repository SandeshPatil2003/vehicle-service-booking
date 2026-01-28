using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VehicleService.API.Enums;
using VehicleService.API.Models;

namespace VehicleService.Models
{
    [Table("bookings")]
    public class Booking
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        [MaxLength(20)]
        [Column("booking_number")]
        public string BookingNumber { get; set; } = null!;

        // -------------------------
        // Relationships
        // -------------------------

        [Required]
        [ForeignKey("User")]
        [Column("user_id")]
        public long UserId { get; set; }
        public User User { get; set; } = null!;

        [ForeignKey("Mechanic")]
        [Column("mechanic_id")]
        public long? MechanicId { get; set; }
        public Mechanic? Mechanic { get; set; }

        [Required]
        [ForeignKey("Service")]
        [Column("service_id")]
        public long ServiceId { get; set; }
        public Service Service { get; set; } = null!;

        // -------------------------
        // Vehicle Info
        // -------------------------

        [Required]
        [MaxLength(50)]
        [Column("vehicle_type")]
        public string VehicleType { get; set; } = null!;

        [MaxLength(50)]
        [Column("vehicle_model")]
        public string? VehicleModel { get; set; }

        [Required]
        [MaxLength(20)]
        [Column("vehicle_number")]
        public string VehicleNumber { get; set; } = null!;

        [Column("problem_description")]
        public string? ProblemDescription { get; set; }

        // -------------------------
        // Booking Time
        // -------------------------

        [Required]
        [Column("booking_date")]
        public DateOnly BookingDate { get; set; }

        [Required]
        [Column("booking_time")]
        public TimeSpan BookingTime { get; set; }

        // -------------------------
        // Status
        // -------------------------

        [Required]
        [Column("status")]
        public BookingStatus Status { get; set; } = BookingStatus.PENDING;

        [Required]
        [Column("payment_status")]
        public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.PENDING;

        // -------------------------
        // Amount & Timestamps
        // -------------------------

        [Column("total_amount", TypeName = "decimal(10,2)")]
        public decimal? TotalAmount { get; set; }

        [Column("assigned_at")]
        public DateTime? AssignedAt { get; set; }

        [Column("started_at")]
        public DateTime? StartedAt { get; set; }

        [Column("completed_at")]
        public DateTime? CompletedAt { get; set; }

        [Column("paid_at")]
        public DateTime? PaidAt { get; set; }

        [Column("cancelled_at")]
        public DateTime? CancelledAt { get; set; }

        [Column("cancellation_reason")]
        public string? CancellationReason { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // -------------------------
        // Constructor Logic (PrePersist replacement)
        // -------------------------
        public Booking()
        {
            BookingNumber = "BK" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
                            + new Random().Next(100, 999);
        }
    }

    // ================= ENUMS =================

 /*   public enum BookingStatus
    {
        PENDING,
        ASSIGNED,
        IN_PROGRESS,
        COMPLETED,
        PAID,
        CANCELLED
    }

    public enum PaymentStatus
    {
        PENDING,
        PROCESSING,
        PAID,
        FAILED,
        REFUNDED
    }*/
}
