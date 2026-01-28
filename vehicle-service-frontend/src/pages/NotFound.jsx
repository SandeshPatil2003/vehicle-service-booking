import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomNavbar from '../components/Navbar';

const NotFound = () => {
  return (
    <>
      <CustomNavbar />
      <Container className="py-5 text-center">
        <div className="py-5 my-5">
          <h1 className="display-1 text-muted">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead mb-4">
            The page you are looking for might have been removed, 
            had its name changed, or is temporarily unavailable.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button as={Link} to="/" variant="primary" size="lg">
              Go to Homepage
            </Button>
            <Button as={Link} to="/services" variant="outline-primary" size="lg">
              Browse Services
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NotFound;