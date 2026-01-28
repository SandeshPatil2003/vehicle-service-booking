import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { authService } from '../services/api';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
const [loading, setLoading] = useState(false); 

// //   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/auth/forgot-password', null, {
//         params: { email }
//       });
//       setMessage('Reset link sent to your email');
//     } catch (err) {
//       setMessage('Email not found');
//     }
//   };
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     await authService.forgotPassword(email);
//     setMessage('Reset link sent to your email');
//   } catch (err) {
//     setMessage(
//       err.response?.data || 'Email not found'
//     );
//   }
// };
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
   setLoading(true);
   setMessage('');

  try {
    const res = await authService.forgotPassword(email);

    setMessage(res.data.message || 'Reset link sent');

    // ✅ redirect after 2 sec
    setTimeout(() => {
      navigate('/login');
    }, 2000);

  } catch (err) {
    const errorMessage =
      err.response?.data?.message || 'Email not found';

    setMessage(errorMessage);
  }
};


  return (
    <Container className="py-5" style={{ maxWidth: '400px' }}>
      <h3 className="mb-3">Forgot Password</h3>

      {message && <Alert>{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </Form.Group>

        <Button
          type="submit"
          className="w-100"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                className="me-2"
              />
              Sending...
            </>
          ) : (
            'Send Reset Link'
          )}
        </Button>

        {/* <Button type="submit" className="w-100">
          Send Reset Link
        </Button> */}
      </Form>
    </Container>
  );
};

export default ForgotPassword;
