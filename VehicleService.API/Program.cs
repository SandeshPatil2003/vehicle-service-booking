
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using VehicleService.API.Data;
using VehicleService.API.Repositories.Implementations;
using VehicleService.API.Repositories.Interfaces;
using VehicleService.Repositories.Implementations;
using VehicleService.Repositories.Interfaces;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json;
using VehicleService.API.Services;
using VehicleService.API.Services.Implementations;
using VehicleService.API.Services.Interfaces;
using VehicleService.API.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using VehicleService.API.Models;
using Microsoft.AspNetCore.Mvc;
using VehicleService.API.Security;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

using System.Text.Json.Serialization;
using VehicleService.API.BackgroundJobsScheduler;

namespace VehicleService.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            // for deployment and aws connection

            builder.Configuration
    .AddJsonFile("appsettings.json", optional: false)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables();


            builder.WebHost.ConfigureKestrel(options =>
            {
                options.ListenAnyIP(5000);
            });


            // Add services to the container.

            //builder.Services.AddControllers();

            builder.Services.AddControllers()
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.Converters.Add(
                new JsonStringEnumConverter()
            );
        });

            //schedular 
            builder.Services.AddScoped<IMechanicAllocator, MechanicAllocator>();
            builder.Services.AddHostedService<MechanicAllocationWorker>();


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            

            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySql(
                    builder.Configuration.GetConnectionString("DefaultConnection"),
                    ServerVersion.AutoDetect(
                        builder.Configuration.GetConnectionString("DefaultConnection")
                    )
                )
            );


            //  builder.Services.AddDbContext<ApplicationDbContext>(options =>
            /*  options.UseSqlServer(
              builder.Configuration.GetConnectionString("DefaultConnection")));*/



            builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });



            /*   builder.Services.AddScoped<IUserRepository, UserRepository>();
               builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
               builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
               builder.Services.AddScoped<IPasswordResetTokenRepository, PasswordResetTokenRepository>();
               builder.Services.AddScoped<IBookingRepository, BookingRepository>();
   */
            // ================= REPOSITORIES =================
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
            builder.Services.AddScoped<IBookingRepository, BookingRepository>();
            builder.Services.AddScoped<IMechanicRepository, MechanicRepository>();
            builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
            builder.Services.AddScoped<IPasswordResetTokenRepository, PasswordResetTokenRepository>();

            // ================= SERVICES =================
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IServiceService, ServiceService>();
            builder.Services.AddScoped<IBookingService, BookingService>();
            builder.Services.AddScoped<IMechanicService, MechanicService>();
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<IEmailService, EmailService>();

            builder.Services.AddScoped<IPaymentService, PaymentService>();

            builder.Services.AddScoped<IMechanicAllocator, MechanicAllocator>();
            builder.Services.AddHostedService<MechanicAllocationWorker>();


            // ================= JWT =================
            builder.Services.AddScoped<JwtTokenUtil>();

            builder.Services.AddHostedService<DemoDataSeeder>();



            /* builder.Services.AddScoped<IUserService, UserService>();
             builder.Services.AddScoped<IEmailService, EmailService>();

             builder.Services.AddScoped<IBookingService, BookingService>();
             builder.Services.AddScoped<IMechanicService, MechanicService>();
             builder.Services.AddScoped<IServiceService, ServiceService>();

             builder.Services.AddHostedService<DemoDataSeeder>();
             builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
 */







            /*  builder.Services.AddScoped<IAuthService, AuthService>();
              builder.Services.AddScoped<IUserService, UserService>();
              builder.Services.AddScoped<IEmailService, EmailService>();
              builder.Services.AddSingleton<JwtTokenUtil>();*/


            /*var jwtSettings = builder.Configuration.GetSection("Jwt");

            var key = jwtSettings["Key"];
            if (string.IsNullOrEmpty(key))
            {
                throw new Exception("JWT Key is missing in appsettings.json");
            }

         *//*   builder.Services.AddAuthentication("Bearer")
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        ValidIssuer = jwtSettings["Issuer"],
                        ValidAudience = jwtSettings["Audience"],
                        IssuerSigningKey =
                            new SymmetricSecurityKey(
                                Encoding.UTF8.GetBytes(key)
                            )
                    };
                });*//*


            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],

        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"])
        ),

        ClockSkew = TimeSpan.Zero
    };

    // ✅ This replaces JwtAuthenticationEntryPoint
    options.Events = new JwtBearerEvents
    {
        OnChallenge = context =>
        {
            context.HandleResponse();
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            context.Response.ContentType = "application/json";

            var response = new
            {
                error = "Unauthorized",
                message = "Authentication required"
            };

            return context.Response.WriteAsync(
                JsonSerializer.Serialize(response)
            );
        }
    };
});
*/

            var jwtSettings = builder.Configuration.GetSection("Jwt");
            var key = jwtSettings["Key"];

            if (string.IsNullOrWhiteSpace(key))
            {
                throw new Exception("JWT Key is missing in appsettings.json");
            }

            builder.Services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        ValidIssuer = jwtSettings["Issuer"],
                        ValidAudience = jwtSettings["Audience"],

                        IssuerSigningKey =
                            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),

                        ClockSkew = TimeSpan.Zero
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnChallenge = context =>
                        {
                            context.HandleResponse();
                            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                            context.Response.ContentType = "application/json";

                            var response = new
                            {
                                error = "Unauthorized",
                                message = "Authentication required"
                            };

                            return context.Response.WriteAsync(
                                JsonSerializer.Serialize(response)
                            );
                        }
                    };

                });


            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin", policy => policy.RequireRole("ADMIN"));
                options.AddPolicy("Mechanic", policy => policy.RequireRole("MECHANIC"));
                options.AddPolicy("Customer", policy => policy.RequireRole("CUSTOMER"));
            });


            builder.Services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    var errors = context.ModelState
                        .Where(x => x.Value.Errors.Count > 0)
                        .ToDictionary(
                            x => x.Key,
                            x => x.Value.Errors.First().ErrorMessage
                        );

                    var response = new ValidationErrorResponse
                    {
                        Timestamp = DateTime.UtcNow,
                        Status = StatusCodes.Status400BadRequest,
                        Error = "Validation Failed",
                        Message = "Please check the following fields",
                        FieldErrors = errors
                    };

                    return new BadRequestObjectResult(response);
                };
            });
            builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();


            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ReactCors", policy =>
                {
                    policy
                        .WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            // for chatbot
            builder.Services.AddHttpClient();


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("ReactCors");


            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();
            //  FOR ELASTIC BEANSTALK
            app.Urls.Add("http://*:5000");

            app.Run();
        }
    }
}