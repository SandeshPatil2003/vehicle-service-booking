import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);

    // For now, just simulate submission
    setTimeout(() => {
      setLoading(false);
      toast.success('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <>
      <CustomNavbar />

      <Container className="py-5">
        <Row className="mb-5 text-center">
          <Col>
            <h1 className="fw-bold">Contact Us</h1>
            <p className="text-muted mt-2">
              We’d love to hear from you. Get in touch with us!
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {/* Contact Info */}
          <Col md={5}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <h4 className="mb-3">Get in Touch</h4>
                <p className="text-muted">
                  Have questions about services, bookings, or support?
                  Reach out to us and our team will assist you.
                </p>

                <div className="mb-3">
                  <strong>📍 Address</strong>
                  <p className="text-muted mb-0">
                    Pune, Maharashtra, India
                  </p>
                </div>

                <div className="mb-3">
                  <strong>📞 Phone</strong>
                  <p className="text-muted mb-0">
                    +91 98765 43210
                  </p>
                </div>

                <div className="mb-3">
                  <strong>✉ Email</strong>
                  <p className="text-muted mb-0">
                    support@vehicleservice.com
                  </p>
                </div>

                <div className="mt-4">
                  <strong>🕒 Working Hours</strong>
                  <p className="text-muted mb-0">
                    Monday – Saturday: 9:00 AM – 7:00 PM
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Form */}
          <Col md={7}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4 className="mb-3">Send Us a Message</h4>

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject (optional)"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Message *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      required
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="text-center mt-5">
          <Col>
            <p className="text-muted">
              © {new Date().getFullYear()} Vehicle Service System. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
