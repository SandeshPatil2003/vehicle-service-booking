// import { useState } from "react";
// import API from "../api";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const login = async (e) => {
//     e.preventDefault();
//     const res = await API.post("/auth/login", { email, password });
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("role", res.data.role);
//     window.location.href = "/user";
//   };

//   return (
//     <div className="container py-5">
//       <h3>Login</h3>
//       <form onSubmit={login}>
//         <input className="form-control mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
//         <input type="password" className="form-control mb-3" placeholder="Password" onChange={e => setPassword(e.target.value)} />
//         <button className="btn btn-primary">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await authService.login(formData.email, formData.password);
      const { token, role, email, firstName, lastName } = response.data;
      
      login(token, { email, role, firstName, lastName });
      
      toast.success('Login successful!');
      
      // Redirect based on role and previous location
      let redirectPath = from;
      if (from === '/') {
        switch(role) {
          case 'ADMIN':
            redirectPath = '/admin';
            break;
          case 'MECHANIC':
            redirectPath = '/mechanic';
            break;
          case 'CUSTOMER':
            redirectPath = '/customer';
            break;
          default:
            redirectPath = '/';
        }
      }
      
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <h2>Welcome Back</h2>
                <p className="text-muted">Sign in to your account</p>
              </div>
              
              {error && <Alert variant="danger" className="text-center">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                  <div className="text-end mt-2">

                   


                    <Link to="/forgot-password" className="text-decoration-none small">
                      Forgot password?
                    </Link>
                  </div>
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </Form>
              
              <div className="text-center mt-4">
                <p className="mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-decoration-none fw-bold">
                    Sign up
                  </Link>
                </p>
                 <p className="mb-0">
                 
                  <Link to="/" className="text-decoration-none fw-bold">
                    Home
                  </Link>
                </p>
              </div>
              
              {/* Demo Credentials */}
              <div className="mt-4 p-3 bg-light rounded">
                <small className="text-muted d-block mb-2">
                  <strong>Demo Credentials:</strong>
                </small>
                <small className="text-muted d-block mb-1">
                  Admin: admin@vehicleservice.com / Admin@123
                </small>
                <small className="text-muted d-block mb-1">
                  Customer: customer@example.com / Customer@123
                </small>
                <small className="text-muted d-block">
                  Mechanic: mechanic@example.com / Mechanic@123
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
