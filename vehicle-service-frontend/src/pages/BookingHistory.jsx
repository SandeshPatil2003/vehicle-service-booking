import React, { useState, useEffect } from 'react';
import { 
  Container, Table, Badge, Button, 
  Alert, Form, Row, Col, Card 
} from 'react-bootstrap';
import { bookingService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import CustomNavbar from '../components/Navbar';
import { toast } from 'react-toastify';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'ALL',
    dateFrom: '',
    dateTo: ''
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, filters]);

  const fetchBookings = async () => {
    try {
      const response = await bookingService.getMyBookings();
      setBookings(response.data);
    } catch (error) {
      toast.error('Failed to load booking history');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...bookings];

    // Filter by status
    if (filters.status !== 'ALL') {
      filtered = filtered.filter(booking => booking.status === filters.status);
    }

    // Filter by date range
    if (filters.dateFrom) {
      filtered = filtered.filter(booking => 
        new Date(booking.bookingDate) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(booking => 
        new Date(booking.bookingDate) <= new Date(filters.dateTo)
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredBookings(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
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

  const getPaymentBadge = (status) => {
    const variants = {
      'PENDING': 'warning',
      'PROCESSING': 'info',
      'PAID': 'success',
      'FAILED': 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const handleViewDetails = (bookingId) => {
    // Navigate to booking details page
    console.log('View details for:', bookingId);
  };

  const handleDownloadInvoice = async (bookingId) => {
    try {
      // API call to generate/download invoice
      toast.info('Invoice download feature coming soon');
    } catch (error) {
      toast.error('Failed to download invoice');
    }
  };

  const handleReBook = (serviceId) => {
    // Navigate to booking page for the same service
    console.log('Re-book service:', serviceId);
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
      
      <Container className="py-5">
        <div className="mb-4">
          <h2>Booking History</h2>
          <p className="text-muted">View and manage all your past bookings</p>
        </div>

        {/* Filters */}
        <Card className="mb-4">
          <Card.Body>
            <Form>
              <Row>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                    >
                      <option value="ALL">All Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="ASSIGNED">Assigned</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="PAID">Paid</option>
                      <option value="CANCELLED">Cancelled</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>From Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateFrom"
                      value={filters.dateFrom}
                      onChange={handleFilterChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>To Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateTo"
                      value={filters.dateTo}
                      onChange={handleFilterChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3} className="d-flex align-items-end">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => setFilters({
                      status: 'ALL',
                      dateFrom: '',
                      dateTo: ''
                    })}
                  >
                    Clear Filters
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {/* Stats */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h5 className="text-primary">{bookings.length}</h5>
                <small className="text-muted">Total Bookings</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h5 className="text-success">
                  {bookings.filter(b => b.status === 'PAID').length}
                </h5>
                <small className="text-muted">Completed</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h5 className="text-warning">
                  {bookings.filter(b => b.status === 'PENDING').length}
                </h5>
                <small className="text-muted">Pending</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h5 className="text-danger">
                  {bookings.filter(b => b.status === 'CANCELLED').length}
                </h5>
                <small className="text-muted">Cancelled</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Bookings Table */}
        {filteredBookings.length === 0 ? (
          <Alert variant="info">
            No bookings found matching your filters.
          </Alert>
        ) : (
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th>Booking #</th>
                  <th>Service</th>
                  <th>Vehicle</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Amount</th>
                  <th>Mechanic</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(booking => (
                  <tr key={booking.id}>
                    <td>
                      <strong>{booking.bookingNumber}</strong>
                    </td>
                    <td>{booking.service?.name}</td>
                    <td>
                      {booking.vehicleType}
                      <br />
                      <small className="text-muted">{booking.vehicleNumber}</small>
                    </td>
                    <td>
                      {booking.bookingDate}
                      <br />
                      <small className="text-muted">{booking.bookingTime}</small>
                    </td>
                    <td>{getStatusBadge(booking.status)}</td>
                    <td>{getPaymentBadge(booking.paymentStatus)}</td>
                    <td>₹{booking.totalAmount}</td>
                    <td>
                      {booking.mechanic ? 
                        `${booking.mechanic.user?.firstName}` : 
                        <span className="text-muted">Not assigned</span>
                      }
                    </td>
                    {/* <td>
                      <div className="d-flex gap-1">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleViewDetails(booking.id)}
                          title="View Details"
                        >
                          <i className="bi bi-eye"></i>
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handleDownloadInvoice(booking.id)}
                          title="Download Invoice"
                          disabled={booking.paymentStatus !== 'PAID'}
                        >
                          <i className="bi bi-download"></i>
                        </Button>
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() => handleReBook(booking.service?.id)}
                          title="Book Again"
                        >
                          <i className="bi bi-arrow-repeat"></i>
                        </Button>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {/* Summary */}
        {bookings.length > 0 && (
          <Card className="mt-4">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>Booking Summary</h6>
                  <p className="mb-1">
                    Total Bookings: <strong>{bookings.length}</strong>
                  </p>
                  <p className="mb-1">
                    Total Amount: <strong>₹{
                      bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0)
                    }</strong>
                  </p>
                </Col>
                {/* <Col md={6} className="text-md-end">
                  <Button variant="outline-primary" className="me-2">
                    <i className="bi bi-download me-1"></i>
                    Export to Excel
                  </Button>
                  <Button variant="primary">
                    <i className="bi bi-printer me-1"></i>
                    Print Report
                  </Button>
                </Col> */}
              </Row>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default BookingHistory;