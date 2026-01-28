import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { serviceService } from '../services/api';
import CustomNavbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await serviceService.getAllServices();
      setServices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <CustomNavbar />
        <Container className="py-5 text-center">
          <div className="spinner-border text-primary" />
        </Container>
      </>
    );
  }

  return (
    <>
      <CustomNavbar />
      
      <Container className="py-5">

        <h2 className="mb-4 text-center">Available Services</h2>


        {services.length === 0 ? (
          <Alert variant="info">No services available at the moment.</Alert>
        ) : (
          <Row>
            {services.map(service => (
              <Col md={4} className="mb-4" key={service.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <h5>{service.name}</h5>
                    <p className="text-muted">{service.description}</p>

                    <div className="d-flex justify-content-between align-items-center">
                      <strong>₹{service.basePrice}</strong>
                      {/* <Button
                        variant="primary"
                        onClick={() => navigate(`/booking/${service.id}`)}
                      >
                        Book Now
                      </Button> */}

                  {user?.role !== 'ADMIN' && user?.role !== 'MECHANIC' && (
  <Button
    variant="primary"
    onClick={() => navigate(`/booking/${service.id}`)}
  >
    Book Now
  </Button>
)}

                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        
      </Container>
     
    </>
  );
};

export default Services;
