import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Tabs, Tab } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { serviceService, bookingService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import CustomNavbar from '../components/Navbar';
import ServiceCard from '../components/ServiceCard';
import { toast } from 'react-toastify';

import { useSearchParams } from 'react-router-dom';
import EditBooking from './EditBooking';
import { paymentService } from '../services/api';

const CustomerDashboard = () => {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeBookings, setActiveBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, bookingsRes] = await Promise.all([
        serviceService.getAllServices(),
        bookingService.getMyBookings()
      ]);
      
      setServices(servicesRes.data);
      setBookings(bookingsRes.data);
      
      // Categorize bookings
      const active = bookingsRes.data.filter(b => 
        ['PENDING', 'ASSIGNED', 'IN_PROGRESS'].includes(b.status)
      );
      const completed = bookingsRes.data.filter(b => 
        ['COMPLETED', 'CANCELLED'].includes(b.status)
      );
      
      setActiveBookings(active);
      setCompletedBookings(completed);
      
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      'PENDING': 'warning',
      'ASSIGNED': 'info',
      'IN_PROGRESS': 'primary',
      'COMPLETED': 'success',
      'PAID': 'success',
      'CANCELLED': 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  // const handlePayment = (booking) => {
  //   // Navigate to payment page or open payment modal
  //   navigate(`/payment/${booking.id}`);
  // };

  // const handleCancelBooking = async (bookingId) => {
  //   if (window.confirm('Are you sure you want to cancel this booking?')) {
  //     try {
  //       await bookingService.cancelBooking(bookingId);
  //       toast.success('Booking cancelled successfully');
  //       fetchData();
  //     } catch (error) {
  //       toast.error('Failed to cancel booking');
  //     }
  //   }
  // };

  
const [searchParams, setSearchParams] = useSearchParams();

const initialTab = searchParams.get('tab') || 'services';
const [activeTab, setActiveTab] = useState(initialTab);

useEffect(() => {
  const tabFromUrl = searchParams.get('tab');
  if (tabFromUrl && tabFromUrl !== activeTab) {
    setActiveTab(tabFromUrl);
  }
}, [searchParams]);


const handleTabChange = (key) => {
  setActiveTab(key);
  setSearchParams({ tab: key });
};


// const handlePayment = async (booking) => {
//   try {
//     // 1️⃣ Create order
//     const res = await paymentService.createOrder(
//       booking.id,
//       booking.totalAmount
//     );

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY,
//       amount: booking.totalAmount * 100,
//       currency: "INR",
//       name: "Vehicle Service System",
//       description: "Service Payment",
//       order_id: res.data.orderId,

//       handler: async function (response) {
//         await paymentService.verifyPayment(
//           booking.id,
//           response.razorpay_order_id,
//           response.razorpay_payment_id,
//           response.razorpay_signature
//         );

//         toast.success("Payment successful");
//         fetchData(); // reload bookings
//       }
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();

//   } catch (err) {
//     toast.error("Payment failed");
//   }
// };
// const handlePayment = async (booking) => {
//   try {
//     const orderRes = await paymentService.createOrder(
//       booking.id,
//       booking.totalAmount
//     );

//     const { orderId, amount } = orderRes.data;

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY, // 👈 IMPORTANT
//       amount: amount * 100,
//       currency: "INR",
//       name: "Vehicle Service System",
//       description: "Service Payment",
//       order_id: orderId,

//       // handler: async function (response) {
//       //   // ✅ CALL ONLY ASP.NET VERIFY
//       //   await paymentService.verifyPayment(
//       //     orderId,
//       //     response.razorpay_payment_id,
//       //     response.razorpay_signature
//       //   );

//       //   toast.success("Payment Successful");
//       //   fetchData();
//       // },

//       prefill: {
//         name: user.firstName,
//         email: user.email
//       }
//     };

//     new window.Razorpay(options).open();
//   } catch (err) {
//     toast.error("Payment failed");
//   }
// };

const handlePayment = async (booking) => {
  try {
    const orderRes = await paymentService.createOrder(
      booking.id,
      booking.totalAmount
    );

    const { orderId, amount } = orderRes.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: amount * 100,
      currency: "INR",
      name: "Vehicle Service System",
      description: "Service Payment",
      order_id: orderId,

      handler: async function (response) {
        try {
          await paymentService.verifyPayment(
            booking.id,
            response.razorpay_payment_id,
            response.razorpay_signature
          );

          toast.success("Payment successful");
          fetchData();
        } catch (err) {
          toast.error("Payment verification failed");
        }
      },

      prefill: {
        name: user.firstName,
        email: user.email
      },

      theme: {
        color: "#0d6efd"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    toast.error("Failed to initiate payment");
  }
};


const handleCancelBooking = async (bookingId) => {
  if (!window.confirm('Are you sure you want to cancel this booking?')) return;

  try {
    await bookingService.cancelBooking(bookingId);
    toast.success('Booking cancelled');
    fetchData();
  } catch {
    toast.error('Failed to cancel booking');
  }
};


  if (loading) {
    return (
      <>
        <CustomNavbar />
        <Container className="py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <CustomNavbar />
      
      <Container fluid className="px-0">
        {/* Welcome Banner */}
        <div className="bg-primary text-white py-4">
          <Container>
            <Row className="align-items-center">
              <Col md={8}>
                <h1 className="h3 mb-2">Welcome back, {user?.firstName}!</h1>
                <p className="mb-0">Manage your vehicle services and bookings</p>
              </Col>
              <Col md={4} className="text-md-end">
                <Button 
                  as={Link} 
                  to="/services" 
                  variant="light"
                  className="me-2"
                >
                  <i className="bi bi-plus-circle me-1"></i>
                  New Booking
                </Button>
              </Col>
            </Row>
          </Container>
        </div>

        <Container className="py-4">
          {/* Stats Cards */}
          <Row className="mb-4">
            <Col md={3}>
              <Card className="text-center h-100">
                <Card.Body>
                  <h1 className="display-6 text-primary">{bookings.length}</h1>
                  <Card.Text className="text-muted">Total Bookings</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center h-100">
                <Card.Body>
                  <h1 className="display-6 text-warning">{activeBookings.length}</h1>
                  <Card.Text className="text-muted">Active Bookings</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center h-100">
                <Card.Body>
                  {/* changed b.status to b.paymentStatus */}
                  <h1 className="display-6 text-success">
                    {completedBookings.filter(b => b.paymentStatus === 'PAID').length} 
                  </h1>
                  <Card.Text className="text-muted">Completed Services</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center h-100">
                <Card.Body>
                  <h1 className="display-6 text-info">{services.length}</h1>
                  <Card.Text className="text-muted">Available Services</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* <Tabs defaultActiveKey="services" className="mb-4"> */}

       <Tabs
  activeKey={activeTab}
  onSelect={handleTabChange}
  className="mb-4"
>


            {/* Services Tab */}
            <Tab eventKey="services" title="Available Services">
              <Row className="mt-3">
                {services.length === 0 ? (
                  <Col>
                    <Alert variant="info">
                      No services available at the moment.
                    </Alert>
                  </Col>
                ) : (
                  services.map(service => (
                    <Col key={service.id} lg={4} md={6} className="mb-4">
                      <ServiceCard service={service} />
                    </Col>
                  ))
                )}
              </Row>
            </Tab>

            {/* Active Bookings Tab */}
            <Tab eventKey="active" title={`Active Bookings (${activeBookings.length})`}>
              <div className="mt-3">
                {activeBookings.length === 0 ? (
                  <Alert variant="info">
                    No active bookings. <Link to="/services">Book a service now</Link>
                  </Alert>
                ) : (
                  activeBookings.map(booking => (
                    <Card key={booking.id} className="mb-3">
                      <Card.Body>
                        <Row className="align-items-center">
                          <Col md={6}>
                            <h5>{booking.service?.name}</h5>
                            <p className="mb-1">
                              <strong>Vehicle:</strong> {booking.vehicleType} - {booking.vehicleNumber}
                            </p>
                            <p className="mb-1">
                              <strong>Date:</strong> {booking.bookingDate} at {booking.bookingTime}
                            </p>
                            <p className="mb-0">
                              <strong>Amount:</strong> ₹{booking.totalAmount}
                            </p>
                          </Col>
                          <Col md={4} className="text-center">
                            {getStatusBadge(booking.status)}
                            {booking.mechanic && (
                              <div className="mt-2">
                                <small className="text-muted ">
                                  
                                    Assigned : {booking.mechanic.firstName} {booking.mechanic.lastName}


                                  {/* Assigned to: {booking.mechanic.user?.firstName} */}
                                </small>
                              </div>
                            )}
                          </Col>
                          <Col md={2} className="text-end">
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleCancelBooking(booking.id)}
                              disabled={booking.status !== 'PENDING'}
                            >
                              Cancel
                            </Button>
                            &nbsp;
                            <Button
                              variant="outline-primary"
                              size="sm"
                               onClick={() => navigate(`/booking/edit/${booking.id}`)}
                             disabled={booking.status !== 'PENDING'}
                              >
                                      Edit
                         </Button>

                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))
                )}
              </div>
            </Tab>

            {/* History Tab */}
            <Tab eventKey="history" title="Booking History">
              <div className="mt-3">
                {completedBookings.length === 0 ? (
                  <Alert variant="info">
                    No booking history available.
                  </Alert>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Booking #</th>
                          <th>Service</th>
                          <th>Vehicle</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Amount</th>
                          <th>Payment</th>
                          {/* <th>Actions</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {completedBookings.map(booking => (
                          <tr key={booking.id}>
                            <td>{booking.bookingNumber}</td>
                            <td>{booking.service?.name}</td>
                            <td>{booking.vehicleNumber}</td>
                            <td>{booking.bookingDate}</td>
                            <td>{getStatusBadge(booking.status)}</td>
                            <td>₹{booking.totalAmount}</td>
                            <td>
                              {/* {booking.status === 'COMPLETED' && booking.paymentStatus === 'PENDING' && (
                              <Button
                                variant="success"
                                        size="sm"
                                      onClick={() => handlePayment(booking)}
                                    >
                              Pay Now
                                </Button>
                              )} */}

                              {/* {booking.paymentStatus === 'PENDING' && (
  <Button
    variant="success"
    size="sm"
    onClick={() => handlePayment(booking)}
  >
    Pay Now
  </Button>
)}


                                    {booking.paymentStatus === 'PAID' && (
                              <Badge bg="success">Paid</Badge>
                                    )} */}

                                    <td>
  {booking.paymentStatus === 'PAID' ? (
    <Badge bg="success">Paid</Badge>
  ) : (
    <Button
      variant="success"
      size="sm"
      disabled={
        booking.status !== 'COMPLETED' ||
        booking.paymentStatus !== 'PENDING'
      }
      onClick={() => handlePayment(booking)}
      title={
        booking.status !== 'COMPLETED'
          ? 'Payment allowed only after job completion'
          : 'Complete payment'
      }
    >
      Pay Now
    </Button>
  )}
</td>


                              {/* {booking.paymentStatus === 'PAID' ? (
                                <Badge bg="success">Paid</Badge>
                              ) : booking.status === 'COMPLETED' ? (
                                <Button 
                                  variant="success" 
                                  size="sm"
                                  onClick={() => handlePayment(booking)}
                                >
                                  Pay Now
                                </Button>
                              ) : (
                                <Badge bg="secondary">Pending</Badge>
                              )} */}
                            </td>
                  

                            {/* <td>
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => navigate(`/booking/${booking.id}`)}
                              >
                                View
                              </Button>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        </Container>
      </Container>
    </>
  );
};

export default CustomerDashboard;