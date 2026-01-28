using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using VehicleService.API.Data;
using VehicleService.API.Models;
using VehicleService.API.Enums;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using VehicleService.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace VehicleService.API.Infrastructure.Data
{
    public class DemoDataSeeder : IHostedService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<DemoDataSeeder> _logger;

        public DemoDataSeeder(
            IServiceProvider serviceProvider,
            ILogger<DemoDataSeeder> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            await context.Database.MigrateAsync(cancellationToken);

            // ================= ADMIN =================
            var admin = await CreateUserIfNotExists(
                context,
                scope.ServiceProvider,
                "admin2@vehicleservice.com",
                "Admin",
                "Admin",
                UserRole.ADMIN,
                "Admin@123"
            );

            //changes

            var passwordHasher = scope.ServiceProvider
 .GetRequiredService<IPasswordHasher<User>>();

            // ================= CUSTOMER =================
            await CreateUserIfNotExists(
                context,
                scope.ServiceProvider,
                "customer@example.com",
                "Demo",
                "Customer",
                UserRole.CUSTOMER,
                "Customer@123"
            );

            // ================= MECHANIC =================
            var mechanicUser = await CreateUserIfNotExists(
                context,
                scope.ServiceProvider,
                "mechanic@example.com",
                "Demo",
                "Mechanic",
                UserRole.MECHANIC,
                "Mechanic@123"
            );

            // Insert mechanic only if not exists
            var mechanicExists = await context.Mechanics
                .AnyAsync(m => m.UserId == mechanicUser.Id, cancellationToken);

            if (!mechanicExists)
            {
                var mechanic = new Mechanic
                {
                    UserId = mechanicUser.Id,
                    SkillLevel = SkillLevel.INTERMEDIATE,
                    Specialization = "General Service",
                    IsAvailable = true,
                    CurrentJobCount = 0,
                    MaxJobs = 3,
                    ExperienceYears = 3,
                    IsVerified = true
                };

                context.Mechanics.Add(mechanic);
                await context.SaveChangesAsync(cancellationToken);
            }

            _logger.LogInformation("✅ Demo users loaded successfully");
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }




        /* private async Task<User> CreateUserIfNotExists(
             ApplicationDbContext context,
             string email,
             string firstName,
             string lastName,
             UserRole role,
             string rawPassword)
         {
             var user = await context.Users
                 .FirstOrDefaultAsync(u => u.Email == email);

             if (user != null)
                 return user;

             user = new User
             {
                 Email = email,
                 FirstName = firstName,
                 LastName = lastName,
                 Phone = "9999999999",
                 Role = role,
                 IsActive = true,
                 Password = BCrypt.Net.BCrypt.HashPassword(rawPassword)
             };

             context.Users.Add(user);
             await context.SaveChangesAsync();

             return user;
         }*/
        private async Task<User> CreateUserIfNotExists(
     ApplicationDbContext context,
     IServiceProvider services,
     string email,
     string firstName,
     string lastName,
     UserRole role,
     string rawPassword)
        {
            var existing = await context.Users
                .FirstOrDefaultAsync(u => u.Email == email);


            if (existing != null)
                return existing;

           // var hasher = services.GetRequiredService<IPasswordHasher<User>>();
            var hasher = services.GetRequiredService<IPasswordHasher<User>>();
            var user = new User
            {
                Email = email,
                FirstName = firstName,
                LastName = lastName,
                Phone = "9999999999",
                Role = role,
                IsActive = true
            };

            user.Password = hasher.HashPassword(user, rawPassword);

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return user;
        }

    }
}
