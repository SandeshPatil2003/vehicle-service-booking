using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VehicleService.API.Enums;
using VehicleService.Models;

namespace VehicleService.API.Models
{
    [Table("payments")]
    public class Payment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        // One-to-One with Booking
        [Required]
        [Column("booking_id")]
        public long BookingId { get; set; }

        public Booking Booking { get; set; }

        [Column("razorpay_order_id")]
        [MaxLength(100)]
        public string? RazorpayOrderId { get; set; }

        [Column("razorpay_payment_id")]
        [MaxLength(100)]
        public string? RazorpayPaymentId { get; set; }

        [Column("razorpay_signature")]
        [MaxLength(255)]
        public string? RazorpaySignature { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        [Range(0.01, double.MaxValue)]
        public decimal? Amount { get; set; }

        [Required]
        [MaxLength(10)]
        public string? Currency { get; set; } = "INR";

        [Required]
        [Column("status")]
        public PaymentStatus Status { get; set; } = PaymentStatus.CREATED;

        [Column("payment_method")]
        [MaxLength(50)]
        public string? PaymentMethod { get; set; }

        [Column("payment_gateway")]
        [MaxLength(50)]
        public string? PaymentGateway { get; set; } = "RAZORPAY";

        [Column("failure_reason")]
        public string? FailureReason { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }

        public void OnCreate()
        {
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }

        public void OnUpdate()
        {
            UpdatedAt = DateTime.UtcNow;
        }
    }

  /*  public enum PaymentStatus
    {
        CREATED,
        ATTEMPTED,
        PAID,
        FAILED,
        REFUNDED
    }*/
}
