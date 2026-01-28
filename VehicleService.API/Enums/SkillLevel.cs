namespace VehicleService.API.Enums
{
    public enum SkillLevel
    {
        BASIC,
        INTERMEDIATE,
        ADVANCED
    }
   /* public enum BookingStatus
    {
        PENDING, ASSIGNED, IN_PROGRESS, COMPLETED, PAID, CANCELLED
    }*/

   /* public enum PaymentStatus
    {
        PENDING, PROCESSING, PAID, FAILED, REFUNDED
    }*/

    public enum BookingStatus
    {
        PENDING,
        ASSIGNED,
        IN_PROGRESS,
        COMPLETED,
        PAID,
        CANCELLED
    }

    public enum PaymentStatus
    {
        PENDING,
        //PROCESSING,
        PAID,
        FAILED,
        REFUNDED,
        ATTEMPTED,
        CREATED

    }
   
}
