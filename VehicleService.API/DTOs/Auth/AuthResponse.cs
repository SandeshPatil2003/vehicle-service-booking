namespace VehicleService.API.DTOs.Auth
{
    public class AuthResponse
    {
        public string Token { get; set; } = string.Empty;
        public string TokenType { get; set; } = "Bearer";
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;

        // ✅ Parameterless constructor (for model binding / serialization)
        public AuthResponse() { }

        // ✅ Full constructor
        public AuthResponse(
            string token,
            string type,
            string email,
            string role,
            string firstName,
            string lastName,
            string phone)
        {
            Token = token;
            TokenType = type;
            Email = email;
            Role = role;
            FirstName = firstName;
            LastName = lastName;
            Phone = phone;
        }
    }
}
