import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { bookingService } from "../services/api";
import { toast } from "react-toastify";

const BookingForm = ({ service }) => {
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleModel: "",
    vehicleNumber: "",
    problemDescription: "",
    bookingDate: "",
    bookingTime: "",
    serviceId: service?.id,
  });
  useEffect(() => {
    if (service?.id) {
      setFormData((prev) => ({
        ...prev,
        serviceId: service.id,
      }));
    }
  }, [service]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.vehicleType.trim()) {
      setError("Vehicle type is required");
      return false;
    }
    if (!formData.vehicleNumber.trim()) {
      setError("Vehicle number is required");
      return false;
    }
    if (!formData.bookingDate) {
      setError("Booking date is required");
      return false;
    }
    if (!formData.bookingTime) {
      setError("Booking time is required");
      return false;
    }
    return true;
  };
  //Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      await bookingService.createBooking(formData);
      toast.success("Booking created successfully!");
      navigate("/customer/bookings");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create booking");
      toast.error("Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="booking-form-container">
      <h3 className="mb-4">Book Service: {service?.name}</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md={6}>
            <Form.Label>Vehicle Type *</Form.Label>
            <Form.Select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              required
            >
              <option value="">Select vehicle type</option>
              <option value="CAR">Car</option>
              <option value="BIKE">Bike</option>
              <option value="SCOOTER">Scooter</option>
              <option value="SUV">SUV</option>
              <option value="TRUCK">Truck</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} md={6}>
            <Form.Label>Vehicle Model</Form.Label>
            <Form.Control
              type="text"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleChange}
              placeholder="e.g., Honda City, Maruti Swift"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Vehicle Number *</Form.Label>
          <Form.Control
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            placeholder="e.g., MH12AB1234"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Problem Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleChange}
            placeholder="Describe the problem you're facing..."
          />
        </Form.Group>

        <Row className="mb-4">
          <Form.Group as={Col} md={6}>
            <Form.Label>Booking Date *</Form.Label>
            <Form.Control
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              min={today}
              required
            />
          </Form.Group>

          <Form.Group as={Col} md={6}>
            <Form.Label>Booking Time *</Form.Label>
            <Form.Control
              type="time"
              name="bookingTime"
              value={formData.bookingTime}
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">
              Our working hours: 9:00 AM - 7:00 PM
            </Form.Text>
          </Form.Group>
        </Row>

        <div className="service-summary bg-light p-3 rounded mb-4">
          <h5>Service Summary</h5>
          <div className="d-flex justify-content-between">
            <span>{service?.name}</span>
            <span className="fw-bold">₹{service?.basePrice}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <span>Total Amount</span>
            <span className="h5 text-primary">₹{service?.basePrice}</span>
          </div>
        </div>

        <div className="d-grid">
          <Button variant="primary" type="submit" size="lg" disabled={loading}>
            {loading ? "Processing..." : "Confirm Booking"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BookingForm;
