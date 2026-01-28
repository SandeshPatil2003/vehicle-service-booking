using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VehicleService.API.DTO;
using VehicleService.API.DTOs;
using VehicleService.API.DTOs.Booking;
using VehicleService.API.Enums;
using VehicleService.API.Models;
using VehicleService.API.Services.Interfaces;

namespace VehicleService.API.Controllers
{
    [ApiController]
    [Route("api/bookings")]
    [Authorize(Roles = "CUSTOMER")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        // POST: api/bookings
        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] BookingRequest request)
        {
            Console.WriteLine("🔥 CreateBooking HIT");

            var email = User.FindFirstValue(ClaimTypes.Name);
            var booking = await _bookingService.CreateBookingAsync(request, email);

            return CreatedAtAction(nameof(GetMyBookings), booking);
        }

        // GET: api/bookings/my-bookings
        [HttpGet("my-bookings")]
        public async Task<IActionResult> GetMyBookings()
        {
            var email = User.FindFirstValue(ClaimTypes.Name);
            var bookings = await _bookingService.GetUserBookingsAsync(email);

            return Ok(bookings);
        }

        // PUT: api/bookings/{id}/status
        [HttpPut("{id}/status")]
        [Authorize(Roles = "MECHANIC")]
        public async Task<IActionResult> UpdateBookingStatus(
            long id,
            [FromQuery] BookingStatus status)
        {
            var email = User.FindFirstValue(ClaimTypes.Name);

            var booking = await _bookingService.UpdateBookingStatusAsync(
                id, status, email);

            return Ok(booking);
        }

        // DELETE: api/bookings/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> CancelBooking(
            long id,
            [FromQuery] string? reason)
        {
            var email = User.FindFirstValue(ClaimTypes.Name);
            await _bookingService.CancelBookingAsync(id, reason, email);

            return Ok("Booking cancelled successfully");
        }

        // 🔥 Payment confirmation (called by payment service / Razorpay webhook)
        // POST: api/bookings/{bookingId}/payment/confirm
        [HttpPost("{bookingId}/payment/confirm")]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmPayment(
            long bookingId,
            [FromBody] PaymentRequest request)
        {
            await _bookingService.ProcessPaymentAsync(
                bookingId,
                request.PaymentId,
                request.Signature
            );

            return Ok(new { message = "Payment processed successfully" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBooking(
    long id,
    [FromBody] UpdateBookingRequest request)
        {
            var email = User.FindFirstValue(ClaimTypes.Name);
            var booking = await _bookingService.UpdateBookingAsync(id, request, email);
            return Ok(booking);
        }



        // GET: api/bookings/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookingById(long id)
        {
            var email = User.FindFirstValue(ClaimTypes.Name);

            var booking = await _bookingService.GetBookingByIdAsync(id, email);

            if (booking == null)
                return NotFound();

            return Ok(booking);
        }

        // PUT: api/bookings/{id}
    /*    [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBooking(
            long id,
            [FromBody] BookingRequest request)
        {
            var email = User.FindFirstValue(ClaimTypes.Name);

    var updated = await _bookingService.UpdateBookingAsync(id, request, email);

            return Ok(updated);
        }*/


    }
}
