using System;
using System.Numerics;
using VehicleService.API.Enums;

namespace VehicleService.API.DTOs.Booking
{
    public class BookingResponse
    {
        public long Id { get; set; }
        public string BookingNumber { get; set; } = string.Empty;

        public UserDto User { get; set; } = null!;
        public MechanicDto? Mechanic { get; set; }
        public ServiceDto Service { get; set; } = null!;

        public string VehicleType { get; set; } = string.Empty;
        public string? VehicleModel { get; set; }
        public string VehicleNumber { get; set; } = string.Empty;
        public string? ProblemDescription { get; set; }

        public DateOnly BookingDate { get; set; }
        public TimeSpan BookingTime { get; set; }

        public BookingStatus Status { get; set; }
        public PaymentStatus PaymentStatus { get; set; }

        public decimal? TotalAmount { get; set; }

        public DateTime? AssignedAt { get; set; }
        public DateTime? StartedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        public DateTime? PaidAt { get; set; }
        public DateTime CreatedAt { get; set; }

        // =========================
        // Nested DTOs
        // =========================

        public class UserDto
        {
            public long Id { get; set; }
            public string FirstName { get; set; } = string.Empty;
            public string LastName { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string Phone { get; set; } = string.Empty;
        }

        public class MechanicDto
        {
            public long Id { get; set; }
            public string FirstName { get; set; } = string.Empty;
            public string LastName { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string Phone { get; set; } = string.Empty;
            public string? Specialization { get; set; }
            public string SkillLevel { get; set; } = string.Empty;
        }

        public class ServiceDto
        {
            public long Id { get; set; }
            public string Name { get; set; } = string.Empty;
            public string? Description { get; set; }
            public decimal BasePrice { get; set; }
            public int DurationMinutes { get; set; }
        }

        /* public static BookingResponse FromEntity(VehicleService.Models.Booking booking)
         {
             return new BookingResponse
             {
                 Id = booking.Id,
                 BookingNumber = booking.BookingNumber,

                 User = new UserDto
                 {
                     Id = booking.User.Id,
                     FirstName = booking.User.FirstName,
                     LastName = booking.User.LastName,
                     Email = booking.User.Email,
                     Phone = booking.User.Phone
                 },

                 Mechanic = booking.Mechanic == null ? null : new MechanicDto
                 {
                     Id = booking.Mechanic.Id,
                     FirstName = booking.Mechanic.User.FirstName,
                     LastName = booking.Mechanic.User.LastName,
                     Email = booking.Mechanic.User.Email,
                     Phone = booking.Mechanic.User.Phone,
                     Specialization = booking.Mechanic.Specialization,
                     SkillLevel = booking.Mechanic.SkillLevel.ToString()
                 },

                 Service = new ServiceDto
                 {
                     Id = booking.Service.Id,
                     Name = booking.Service.Name,
                     Description = booking.Service.Description,
                     BasePrice = booking.Service.BasePrice,
                     DurationMinutes = booking.Service.DurationMinutes
                 },

                 VehicleType = booking.VehicleType,
                 VehicleModel = booking.VehicleModel,
                 VehicleNumber = booking.VehicleNumber,
                 ProblemDescription = booking.ProblemDescription,
                 BookingDate = booking.BookingDate,
                 BookingTime = booking.BookingTime,
                 Status = booking.Status,
                 PaymentStatus = booking.PaymentStatus,
                 TotalAmount = booking.TotalAmount,
                 AssignedAt = booking.AssignedAt,
                 StartedAt = booking.StartedAt,
                 CompletedAt = booking.CompletedAt,
                 PaidAt = booking.PaidAt,
                 CreatedAt = booking.CreatedAt
             };*/
        public static BookingResponse FromEntity(VehicleService.Models.Booking booking)
        {
            return new BookingResponse
            {
                Id = booking.Id,
                BookingNumber = booking.BookingNumber,

                User = booking.User == null ? null! : new UserDto
                {
                    Id = booking.User.Id,
                    FirstName = booking.User.FirstName,
                    LastName = booking.User.LastName,
                    Email = booking.User.Email,
                    Phone = booking.User.Phone
                },

                Mechanic = booking.Mechanic == null || booking.Mechanic.User == null
                    ? null
                    : new MechanicDto
                    {
                        Id = booking.Mechanic.Id,
                        FirstName = booking.Mechanic.User.FirstName,
                        LastName = booking.Mechanic.User.LastName,
                        Email = booking.Mechanic.User.Email,
                        Phone = booking.Mechanic.User.Phone,
                        Specialization = booking.Mechanic.Specialization,
                        SkillLevel = booking.Mechanic.SkillLevel.ToString()
                    },

                Service = booking.Service == null ? null! : new ServiceDto
                {
                    Id = booking.Service.Id,
                    Name = booking.Service.Name,
                    Description = booking.Service.Description,
                    BasePrice = booking.Service.BasePrice,
                    DurationMinutes = booking.Service.DurationMinutes
                },

                VehicleType = booking.VehicleType,
                VehicleModel = booking.VehicleModel,
                VehicleNumber = booking.VehicleNumber,
                ProblemDescription = booking.ProblemDescription,

                BookingDate = booking.BookingDate,
                BookingTime = booking.BookingTime,
                Status = booking.Status,
                PaymentStatus = booking.PaymentStatus,
                TotalAmount = booking.TotalAmount,

                AssignedAt = booking.AssignedAt,
                StartedAt = booking.StartedAt,
                CompletedAt = booking.CompletedAt,
                PaidAt = booking.PaidAt,
                CreatedAt = booking.CreatedAt
            };
       // }

    }
}
}
