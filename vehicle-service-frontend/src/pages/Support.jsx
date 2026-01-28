import React from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar';
import { toast } from 'react-toastify';

const Support = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Support request submitted successfully!');
    e.target.reset();
  };

  return (
    <>
      <CustomNavbar />
      
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <h1 className="text-center mb-5">Contact Support</h1>
            
            <Row>
              <Col lg={4} className="mb-4">
                <Card className="h-100 text-center">
                  <Card.Body>
                    <div className="display-1 mb-3 text-primary">
                      <i className="bi bi-telephone"></i>
                    </div>
                    <h4>Call Us</h4>
                    <p className="text-muted">Available 24/7</p>
                    <h5>+91 1234567890</h5>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col lg={4} className="mb-4">
                <Card className="h-100 text-center">
                  <Card.Body>
                    <div className="display-1 mb-3 text-success">
                      <i className="bi bi-envelope"></i>
                    </div>
                    <h4>Email Us</h4>
                    <p className="text-muted">Response within 24 hours</p>
                    <h5>support@vehicleservice.com</h5>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col lg={4} className="mb-4">
                <Card className="h-100 text-center">
                  <Card.Body>
                    <div className="display-1 mb-3 text-warning">
                      <i className="bi bi-clock"></i>
                    </div>
                    <h4>Business Hours</h4>
                    <p className="text-muted">Mon - Sat</p>
                    <h5>9:00 AM - 7:00 PM</h5>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            <Card className="mt-4">
              <Card.Body>
                <h3 className="mb-4">Send us a Message</h3>
                
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control type="text" required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" required />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" required />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={5} required />
                  </Form.Group>
                  
                  <Button variant="primary" type="submit" size="lg">
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            
            <Card className="mt-4">
              <Card.Body>
                <h4 className="mb-3">Frequently Asked Questions</h4>
                
                <div className="accordion" id="faqAccordion">
                  {[
                    {
                      q: "How do I book a service?",
                      a: "You can book a service by selecting the service from our services page, clicking 'Book Now', and filling out the booking form."
                    },
                    {
                      q: "What payment methods do you accept?",
                      a: "We accept all major credit/debit cards, net banking, UPI, and cash on service completion."
                    },
                    {
                      q: "How are mechanics assigned?",
                      a: "Mechanics are dynamically assigned based on their skill level, availability, and proximity to your location."
                    },
                    {
                      q: "Can I cancel or reschedule my booking?",
                      a: "Yes, you can cancel or reschedule your booking up to 2 hours before the scheduled time from your dashboard."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#faq${index}`}>
                          {faq.q}
                        </button>
                      </h2>
                      <div id={`faq${index}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Support;