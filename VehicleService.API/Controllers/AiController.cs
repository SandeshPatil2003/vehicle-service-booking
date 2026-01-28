using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace VehicleService.API.Controllers
{
    [ApiController]
    [Route("api/ai")]
    public class AiController : ControllerBase
    {
        private readonly HttpClient _http;
        private readonly IConfiguration _config;

        public AiController(HttpClient http, IConfiguration config)
        {
            _http = http;
            _config = config;
        }

        [HttpPost("chat")]
        public async Task<IActionResult> Chat([FromBody] ChatRequest request)
        {
            var apiKey = _config["HuggingFace:ApiKey"];

            var hfRequest = new
            {
                inputs = request.Message
            };

            var content = new StringContent(
                JsonSerializer.Serialize(hfRequest),
                Encoding.UTF8,
                "application/json"
            );

            _http.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", apiKey);
            //"https://api-inference.huggingface.co/models/google/flan-t5-small",

            var response = await _http.PostAsync("https://api-inference.huggingface.co/models/tiiuae/falcon-rw-1b",
             
                content
            );

            if (!response.IsSuccessStatusCode)
                return StatusCode(503, "AI service unavailable");

            var json = await response.Content.ReadAsStringAsync();
            return Ok(json);
        }
    }

    public class ChatRequest
    {
        public string Message { get; set; }
    }
}
