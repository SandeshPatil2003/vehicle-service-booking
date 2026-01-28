using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;
using VehicleService.API.Models;
using VehicleService.Models;

namespace VehicleService.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Tables
        public DbSet<User> Users { get; set; }
        public DbSet<Mechanic> Mechanics { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<PasswordResetToken> PasswordResetTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // USER
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // USER ↔ MECHANIC (One-to-One)
            modelBuilder.Entity<Mechanic>()
                .HasOne(m => m.User)
                .WithOne(u => u.Mechanic)
                .HasForeignKey<Mechanic>(m => m.UserId);

           


            /* modelBuilder.Entity<Booking>()
                 .Property(b => b.BookingDate)
                 .HasConversion(
                     d => d.ToDateTime(TimeOnly.MinValue),   // DateOnly → DateTime
                     d => DateOnly.FromDateTime(d)           // DateTime → DateOnly
                 );

             modelBuilder.Entity<Booking>()
                 .Property(b => b.BookingTime)
                 .HasConversion(
                     t => DateTime.Today.Add(t.ToTimeSpan()),
                     d => TimeOnly.FromDateTime(d)
                 );*/

            // ---- DateOnly mapping ----
            modelBuilder.Entity<Booking>()
                .Property(b => b.BookingDate)
                .HasConversion(
                    d => d.ToDateTime(TimeOnly.MinValue),   // DateOnly → DateTime
                    d => DateOnly.FromDateTime(d)           // DateTime → DateOnly
                );

            // PASSWORD RESET TOKEN 

            modelBuilder.Entity<PasswordResetToken>()
    .HasOne(t => t.User)
    .WithOne()
    .HasForeignKey<PasswordResetToken>(t => t.UserId)
    .OnDelete(DeleteBehavior.Cascade);


            /* modelBuilder.Entity<PasswordResetToken>()
     .HasOne(p => p.User)
     .WithMany(u => u.PasswordResetTokens)
     .HasForeignKey(p => p.UserId)
     .OnDelete(DeleteBehavior.Cascade);*/

            // PASSWORD RESET TOKEN (One-to-One)
            /* modelBuilder.Entity<PasswordResetToken>()
                 .HasOne(t => t.User)
                 .WithOne()
                 .HasForeignKey<PasswordResetToken>(t => t.UserId)
                 .OnDelete(DeleteBehavior.Cascade);*/

            /*  protected override void OnModelCreating(ModelBuilder modelBuilder)
          {*/
            modelBuilder.Entity<Booking>(entity =>
            {
                entity.Property(b => b.BookingDate)
                      .HasColumnType("date");

                entity.Property(b => b.BookingTime)
                      .HasColumnType("time");
            });
            // }

            // USER ROLE
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion<string>(); // ✅ VERY IMPORTANT

            // BOOKING STATUS
            modelBuilder.Entity<Booking>()
                .Property(b => b.Status)
                .HasConversion<string>();

            modelBuilder.Entity<Booking>()
                .Property(b => b.PaymentStatus)
                .HasConversion<string>();

            // MECHANIC SKILL LEVEL
            modelBuilder.Entity<Mechanic>()
                .Property(m => m.SkillLevel)
                .HasConversion<string>();

            // PAYMENT STATUS ENUM (int) TO String ENUM
            modelBuilder.Entity<Payment>()
                .Property(p => p.Status)
                .HasConversion<string>();


            // SERVICE REQUIRED SKILL
            modelBuilder.Entity<Service>()
                .Property(s => s.RequiredSkill)
                .HasConversion<string>();

          


        }
}
}
