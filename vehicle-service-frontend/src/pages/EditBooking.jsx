// import { useParams, useNavigate } from "react-router-dom";
// import { bookingService } from "../services/api";
// import { useState } from "react";
// import { toast } from "react-toastify";

// const EditBooking = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     vehicleModel: "",
//     vehicleNumber: "",
//     problemDescription: "",
//     bookingDate: "",
//     bookingTime: ""
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await bookingService.updateBooking(id, form);
//       toast.success("Booking updated");
//       navigate("/dashboard?tab=active");
//     } catch {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input onChange={e => setForm({...form, vehicleModel: e.target.value})} />
//       <input onChange={e => setForm({...form, vehicleNumber: e.target.value})} />
//       <textarea onChange={e => setForm({...form, problemDescription: e.target.value})}/>
//       <input type="date" onChange={e => setForm({...form, bookingDate: e.target.value})}/>
//       <input type="time" onChange={e => setForm({...form, bookingTime: e.target.value})}/>
//       <button type="submit">Update</button>
//     </form>
//   );
// };

// export default EditBooking;


import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Card, Form, Button,
  Alert, Spinner, Breadcrumb, Badge
} from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { bookingService } from '../services/api';
import CustomNavbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
//import { format } from 'date-fns';

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    vehicleModel: '',
    vehicleNumber: '',
    problemDescription: '',
    bookingDate: '',
    bookingTime: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      const res = await bookingService.getBookingById(id);
      const data = res.data;

      if (data.status !== 'PENDING') {
        toast.error('Only pending bookings can be edited');
        navigate('/dashboard?tab=active');
        return;
      }

      setBooking(data);

      setFormData({
        vehicleModel: data.vehicleModel || '',
        vehicleNumber: data.vehicleNumber || '',
        problemDescription: data.problemDescription || '',
        bookingDate: data.bookingDate,             // format(new Date(data.bookingDate), 'yyyy-MM-dd'),
        bookingTime: data.bookingTime?.substring(0, 5)
      });

    } catch {
      toast.error('Failed to load booking');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.vehicleNumber) errs.vehicleNumber = 'Required';
    if (!formData.bookingDate) errs.bookingDate = 'Required';
    if (!formData.bookingTime) errs.bookingTime = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await bookingService.updateBooking(id, formData);
      toast.success('Booking updated successfully');
      setTimeout(() => {
  if (user.role === 'CUSTOMER') {
    navigate('/customer/dashboard?tab=active');
  } else {
    navigate(redirectPath());
  }
}, 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <CustomNavbar />
        <Container className="py-5 text-center">
          <Spinner />
        </Container>
      </>
    );
  }


  const today = new Date();
const todayDate = today.toISOString().split('T')[0];

const getMinTime = () => {
  if (formData.bookingDate === todayDate) {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // HH:mm
  }
  return "00:00";
};


  return (
    <>
      <CustomNavbar />
      <Container className="py-4">
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/dashboard' }}>
            My Bookings
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit Booking</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="justify-content-center">
          <Col md={7}>
            <Card>
              <Card.Header className="bg-primary text-white">
                <h5>Edit Booking</h5>
                {booking &&(
                <Badge bg="light" text="dark">{ booking.status}</Badge>
                )}
              </Card.Header>

              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Vehicle Number</Form.Label>
                    <Form.Control
                      name="vehicleNumber"
                      value={formData.vehicleNumber}
                      onChange={handleChange}
                      isInvalid={!!errors.vehicleNumber}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Vehicle Model</Form.Label>
                    <Form.Control
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Problem Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="problemDescription"
                      value={formData.problemDescription}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Control
                        type="date"
                        name="bookingDate"
                        value={formData.bookingDate}
                         min={todayDate}
                        onChange={handleChange}
                        
                        isInvalid={!!errors.bookingDate}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="time"
                        name="bookingTime"
                        value={formData.bookingTime}
                        min={getMinTime()}
                        onChange={handleChange}

                        isInvalid={!!errors.bookingTime}
                      />
                    </Col>
                  </Row>

                  <div className="mt-4 d-flex justify-content-between">
                    <Button
                      variant="secondary"
                      onClick={() => navigate('/customer/dashboard?tab=active')}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? 'Updating...' : 'Update'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>

              <Card.Footer className="text-muted">
                Created at: {new Date(booking.createdAt).toLocaleString()}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditBooking;

