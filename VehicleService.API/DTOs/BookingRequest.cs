using System;
using System.ComponentModel.DataAnnotations;
using VehicleService.API.Validators;


namespace VehicleService.API.DTOs.Booking
{
    public class BookingRequest
    {
        [Required(ErrorMessage = "Service ID is required")]
        public long ServiceId { get; set; }

        [Required(ErrorMessage = "Vehicle type is required")]
        public string VehicleType { get; set; } = string.Empty;

        public string? VehicleModel { get; set; }

        [Required(ErrorMessage = "Vehicle number is required")]
        public string VehicleNumber { get; set; } = string.Empty;

        public string? ProblemDescription { get; set; }

        [Required(ErrorMessage = "Booking date is required")]
        [FutureDate(ErrorMessage = "Booking date must be in the future")]
      /*  public DateOnly BookingDate { get; set; }

        [Required(ErrorMessage = "Booking time is required")]
        public TimeSpan BookingTime { get; set; }*/

        //[Required]
        public string BookingDate { get; set; }  // "2026-01-25"

        // [Required]
        [Required(ErrorMessage = "Booking time is required")]
        public string BookingTime { get; set;}  // "10:30"
    }
}
