using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using VehicleService.API.Exceptions;
using VehicleService.API.Models;

namespace VehicleService.API.Middleware
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;

        public GlobalExceptionMiddleware(
            RequestDelegate next,
            ILogger<GlobalExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (NotFoundException ex)
            {
                await HandleException(
                    context,
                    HttpStatusCode.NotFound,
                    "Resource Not Found",
                    ex.Message
                );
            }
            catch (UnauthorizedAccessException)
            {
                await HandleException(
                    context,
                    HttpStatusCode.Unauthorized,
                    "Authentication Failed",
                    "Invalid email or password"
                );
            }
            catch (ForbiddenAccessException ex)
            {
                await HandleException(
                    context,
                    HttpStatusCode.Forbidden,
                    "Access Denied",
                    ex.Message
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception");

                await HandleException(
                    context,
                    HttpStatusCode.InternalServerError,
                    "Internal Server Error",
                    ex.Message
                );
            }
        }

        private static async Task HandleException(
            HttpContext context,
            HttpStatusCode statusCode,
            string error,
            string message)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            var response = new ErrorResponse
            {
                Timestamp = DateTime.UtcNow,
                Status = (int)statusCode,
                Error = error,
                Message = message,
                Path = context.Request.Path
            };

            var json = JsonSerializer.Serialize(response);
            await context.Response.WriteAsync(json);
        }
    }
}
