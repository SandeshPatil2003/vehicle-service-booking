// import React, { useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { Container, Form, Button, Alert } from 'react-bootstrap';
// import api from '../services/api';

// const ResetPassword = () => {
//   const [params] = useSearchParams();
//   const token = params.get('token');
//   const navigate = useNavigate();

//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await api.post('/auth/reset-password', null, {
// //         params: { token, newPassword: password }
// //       });
// //       setMessage('Password reset successful');
// //       setTimeout(() => navigate('/login'), 2000);
// //     } catch (err) {
// //       setMessage('Invalid or expired link');
// //     }
// //   };

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

//   return (
//     <Container className="py-5" style={{ maxWidth: '400px' }}>
//       <h3>Reset Password</h3>

//       {message && <Alert>{message}</Alert>}

//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>New Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Button type="submit" className="w-100">
//           Reset Password
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default ResetPassword;


import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { authService } from '../services/api';

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await authService.resetPassword(token, password);

      setMessage('Password reset successful');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired link');
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '400px' }}>
      <h3>Reset Password</h3>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" className="w-100">
          Reset Password
        </Button>
      </Form>
    </Container>
  );
};

export default ResetPassword;
