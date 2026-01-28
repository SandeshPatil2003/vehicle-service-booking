import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



const ServiceCard = ({ service, onEdit }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();



  const getSkillBadge = (skill) => {
    const variants = {
      'BASIC': 'success',
      'INTERMEDIATE': 'warning',
      'ADVANCED': 'danger'
    };
    return (
      <Badge bg={variants[skill]} className="ms-2">
        {skill}
      </Badge>
    );
  };

  const handleBookClick = () => {
    if (!isAuthenticated()) {
      navigate('/login');
    } else if (user?.role !== 'CUSTOMER') {
      alert('Only customers can book services');
    } else {
      navigate(`/booking/${service.id}`);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Card.Title className="mb-0">{service.name}</Card.Title>
          {getSkillBadge(service.requiredSkill)}
        </div>
        <Card.Text className="text-muted mb-3 flex-grow-1">
          {service.description}
        </Card.Text>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="text-primary mb-0">₹{service.basePrice}</h4>
              <small className="text-muted">Duration: {service.durationMinutes} mins</small>
            </div>
            {/* ACTION BUTTON */}

          {/* {user?.role === 'ADMIN' ? null : (
            <Button variant="primary" onClick={handleBookClick}>
              {isAuthenticated() ? 'Book Now' : 'View Details'}
            </Button>
          )} */}
 
              {user?.role !== 'ADMIN' && user?.role !== 'MECHANIC' && (
              <Button variant="primary" onClick={handleBookClick}>
               {isAuthenticated() ? 'Book Now' : 'View Details'}
              </Button>
              )}

    
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;