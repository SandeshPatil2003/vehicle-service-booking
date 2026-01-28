import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { serviceService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import CustomNavbar from '../components/Navbar';
import BookingForm from '../components/BookingForm';

const BookingPage = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: `/booking/${serviceId}` } });
      return;
    }

    if (user?.role !== 'CUSTOMER') {
      navigate('/');
      return;
    }

    fetchService();
  }, [serviceId, user, isAuthenticated, navigate]);

  const fetchService = async () => {
    try {
      const response = await serviceService.getServiceById(serviceId);
      setService(response.data);
    } catch (err) {
      setError('Failed to load service details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <CustomNavbar />
        <Container className="py-5 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <CustomNavbar />
        <Container className="py-5">
          <Alert variant="danger">{error}</Alert>
          <button className="btn btn-primary" onClick={() => navigate('/services')}>
            Back to Services
          </button>
        </Container>
      </>
    );
  }

  return (
    <>
      <CustomNavbar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <Card className="shadow">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">Book Service</h4>
              </Card.Header>
              <Card.Body className="p-4 p-md-5">
                <BookingForm service={service} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BookingPage;