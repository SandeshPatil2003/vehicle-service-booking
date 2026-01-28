import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar';

const About = () => {
  return (
    <>
      <CustomNavbar />

      <Container className="py-5">
        <Row className="mb-5 text-center">
          <Col>
            <h1 className="fw-bold">About Vehicle Service System</h1>
            <p className="text-muted mt-2">
              A smart platform to manage vehicle servicing with ease and transparency
            </p>
          </Col>
        </Row>

        {/* Who We Are */}
        <Row className="mb-4">
          <Col md={6}>
            <h4>Who We Are</h4>
            <p className="text-muted">
              Vehicle Service System is a modern web-based platform designed to simplify
              vehicle servicing for customers, mechanics, and administrators.
              We connect vehicle owners with skilled mechanics and ensure smooth
              service management from booking to completion.
            </p>
          </Col>

          <Col md={6}>
            <h4>Our Mission</h4>
            <p className="text-muted">
              Our mission is to provide a reliable, transparent, and efficient
              vehicle service experience. We aim to reduce service delays,
              improve mechanic utilization, and enhance customer satisfaction.
            </p>
          </Col>
        </Row>

        {/* Features */}
        <Row className="mb-5">
          <Col>
            <h4 className="mb-3">What We Offer</h4>
            <Row>
              <Col md={4} className="mb-3">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <h5>🚗 Easy Booking</h5>
                    <p className="text-muted">
                      Customers can quickly book services and track their status in real time.
                    </p>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4} className="mb-3">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <h5>🛠 Skilled Mechanics</h5>
                    <p className="text-muted">
                      Jobs are dynamically assigned to mechanics based on skill and availability.
                    </p>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4} className="mb-3">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <h5>📊 Admin Control</h5>
                    <p className="text-muted">
                      Admins can manage services, users, bookings, and system analytics.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Why Choose Us */}
        <Row className="mb-5">
          <Col>
            <h4>Why Choose Us?</h4>
            <ul className="text-muted mt-3">
              <li>Role-based access for customers, mechanics, and admins</li>
              <li>Secure authentication and authorization</li>
              <li>Real-time job assignment and tracking</li>
              <li>Simple and user-friendly interface</li>
              <li>Transparent pricing and service workflow</li>
            </ul>
          </Col>
        </Row>

        {/* Footer */}
        <Row className="text-center mt-5">
          <Col>
            <p className="text-muted">
              © {new Date().getFullYear()} Vehicle Service System, All Rights Reserved!
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
