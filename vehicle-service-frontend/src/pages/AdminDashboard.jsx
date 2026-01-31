import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Table, Button, 
  Badge, Form, Modal, Tabs, Tab, Alert 
} from 'react-bootstrap';
import { 
  adminService, 
  mechanicService, 
  serviceService,
  bookingService 
} from '../services/api';
import { useAuth } from '../context/AuthContext';
import CustomNavbar from '../components/Navbar';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMechanics: 0,
    totalBookings: 0,
    pendingBookings: 0,
    revenue: 0
  });
  
  const [users, setUsers] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showAddMechanic, setShowAddMechanic] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
const [editingMechanic, setEditingMechanic] = useState(null);

  const [newMechanic, setNewMechanic] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    password: 'Mechanic@123',
    skillLevel: 'BASIC',
    specialization: ''
  });

  const [newService, setNewService] = useState({
    name: '',
    description: '',
    basePrice: '',
    durationMinutes: '',
    requiredSkill: 'BASIC'
  });

  const [newAdmin, setNewAdmin] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    password: 'Admin@123'
  });

  const [activeTab, setActiveTab] = useState('users');


  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const [usersRes, mechanicsRes, servicesRes, bookingsRes] = await Promise.all([
        adminService.getAllUsers(),
        mechanicService.getAllMechanics(),
        serviceService.getAllServices(),
        adminService.getAllBookings()
      ]);

      setUsers(usersRes.data);
      setMechanics(mechanicsRes.data);
      setServices(servicesRes.data);
      setBookings(bookingsRes.data);

      // Calculate stats
      const totalUsers = usersRes.data.length;
      const totalMechanics = mechanicsRes.data.length;
      const totalBookings = bookingsRes.data.length;
      const pendingBookings = bookingsRes.data.filter(b => 
        ['PENDING', 'ASSIGNED', 'IN_PROGRESS'].includes(b.status)
      ).length;
      const revenue = bookingsRes.data
        .filter(b => b.paymentStatus === 'PAID')     //b.status 
        .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

      setStats({
        totalUsers,
        totalMechanics,
        totalBookings,
        pendingBookings,
        revenue
      });

    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMechanic = async () => {
    try {
      await mechanicService.addMechanic(newMechanic);
      toast.success('Mechanic added successfully');
      setShowAddMechanic(false);
      setNewMechanic({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        password: 'Mechanic@123',
        skillLevel: 'BASIC',
        specialization: ''
      });
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to add mechanic');
    }
  };
const handleUpdateMechanic = async () => {
  try {
    await mechanicService.updateMechanic(
      editingMechanic.id,
      {
        skillLevel: newMechanic.skillLevel,
        specialization: newMechanic.specialization,
        experienceYears: newMechanic.experienceYears
      }
    );

    toast.success('Mechanic updated successfully');
    setShowAddMechanic(false);
    setEditingMechanic(null);
    fetchDashboardData();
  } catch (error) {
    toast.error('Failed to update mechanic');
  }
};


  const handleAddService = async () => {
  try {
    const payload = {
      ...newService,
      basePrice: parseFloat(newService.basePrice),
      durationMinutes: parseInt(newService.durationMinutes),
    };

    if (newService.id) {
      await serviceService.updateService(newService.id, payload);

      toast.success('Service updated successfully');
      setActiveTab('services');
fetchDashboardData();

    } else {
      await serviceService.addService(payload);
      toast.success('Service added successfully');
      setActiveTab('services');
      fetchDashboardData();

    }

    setShowAddService(false);
    setNewService({
      name: '',
      description: '',
      basePrice: '',
      durationMinutes: '',
      requiredSkill: 'BASIC'
    });

    fetchDashboardData();
  } catch (error) {
    console.error(error);
    toast.error('Failed to save service');
  }
};


  const handleAddAdmin = async () => {
    try {
      await adminService.createAdmin(newAdmin);
      toast.success('Admin added successfully');
      setShowAddAdmin(false);
      setNewAdmin({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        password: 'Admin@123'
      });
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to add admin');
    }
  };

  // const handleToggleUserStatus = async (userId, currentStatus) => {
  //   try {
  //     // API call to toggle user status would go here
  //     toast.success('User status updated');
  //     fetchDashboardData();
  //   } catch (error) {
  //     toast.error('Failed to update user status');
  //   }
  // };
const handleToggleUserStatus = async (userId) => {
  try {
    await adminService.toggleUserStatus(userId);
    toast.success('User status updated');
    fetchDashboardData();
  } catch (error) {
    toast.error('Failed to update user status');
  }
};

  const getStatusBadge = (status) => {
    const variants = {
      'ACTIVE': 'success',
      'INACTIVE': 'secondary',
      'PENDING': 'warning',
      'SUSPENDED': 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const getBookingStatusBadge = (status) => {
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
        {/* Admin Header */}
        <div className="bg-danger text-white py-4">
          <Container>
            <Row className="align-items-center">
              <Col md={8}>
                <h1 className="h3 mb-2">Admin Dashboard</h1>
                <p className="mb-0">Manage users, mechanics, services, and bookings</p>
              </Col>
              <Col md={4} className="text-md-end">
                <Badge bg="light" text="dark" className="fs-6 px-3 py-2">
                  Total Revenue: ₹{stats.revenue.toLocaleString()}
                </Badge>
              </Col>
            </Row>
          </Container>
        </div>

        <Container className="py-4">
          {/* Quick Stats */}
          <Row className="mb-4">
            <Col md={2} sm={4} xs={6}>
              <Card className="text-center h-100">
                <Card.Body>
                  <h1 className="display-6 text-primary">{stats.totalUsers}</h1>
                  <Card.Text>Total Users</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} sm={4} xs={6}>
              <Card className="text-center h-100">
                <Card.Body>
                  <h1 className="display-6 text-warning">{stats.totalMechanics}</h1>
                  <Card.Text>Mechanics</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} sm={4} xs={6}>
              <Card className="text-center h-100">
                <Card.Body>
                  <h1 className="display-6 text-info">{stats.totalBookings}</h1>
                  <Card.Text>Total Bookings</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} sm={4} xs={6}>
              <Card className="text-center h-100">
                <Card.Body>
                  <h1 className="display-6 text-secondary">{stats.pendingBookings}</h1>
                  <Card.Text>Pending</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} sm={4} xs={6}>
              <Card className="text-center h-100">
                <Card.Body>
                  <h1 className="display-6 text-success">{services.length}</h1>
                  <Card.Text>Services</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} sm={4} xs={6}>
              <Card className="text-center h-100">
                <Card.Body>
                  <h1 className="display-6 text-danger">₹{stats.revenue.toLocaleString()}</h1>
                  <Card.Text>Revenue</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Action Buttons */}
          <div className="d-flex gap-2 mb-4">
            <Button variant="primary" onClick={() => setShowAddMechanic(true)}>
              <i className="bi bi-person-plus me-1"></i>
              Add Mechanic
            </Button>
            <Button variant="success" onClick={() => setShowAddService(true)}>
              <i className="bi bi-plus-circle me-1"></i>
              Add Service
            </Button>
            <Button variant="warning" onClick={() => setShowAddAdmin(true)}>
              <i className="bi bi-shield-plus me-1"></i>
              Add Admin
            </Button>
            {/* <Button variant="info">
              <i className="bi bi-download me-1"></i>
              Export Report
            </Button> */}
          </div>
                  {/* // defaultActiveKey="users" */}
          <Tabs activeKey={activeTab}
  onSelect={(key) => setActiveTab(key)} className="mb-4">
            {/* Users Tab */}
            <Tab eventKey="users" title="Users">
              <div className="table-responsive">
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>
                          <Badge bg={
                            user.role === 'ADMIN' ? 'danger' :
                            user.role === 'MECHANIC' ? 'warning' : 'info'
                          }>
                            {user.role}
                          </Badge>
                        </td>
                        <td>{user.phone || '-'}</td>
                        <td>{getStatusBadge(user.isActive ? 'ACTIVE' : 'INACTIVE')}</td>
                        <td>
                          {/* <Button variant="outline-primary" size="sm" className="me-1">
                            <i className="bi bi-eye"></i>
                          </Button> */}
                          <Button 
                            variant="outline-warning" 
                            size="sm"
                            onClick={() => handleToggleUserStatus(user.id, user.isActive)}
                          >
                            <i className="bi bi-power"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>

            {/* Mechanics Tab */}
            <Tab eventKey="mechanics" title="Mechanics">
              <div className="table-responsive">
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Skill Level</th>
                      <th>Specialization</th>
                      <th>Availability</th>
                      <th>Jobs</th>
                      {/* <th>Rating</th> */}
                      {/* <th>Actions</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {mechanics.map(mechanic => (
                      <tr key={mechanic.id}>
                        <td>{mechanic.id}</td>
                        <td>{mechanic.user?.firstName} {mechanic.user?.lastName}</td>
                        <td>{mechanic.user?.email}</td>
                        <td>
                          <Badge bg={
                            mechanic.skillLevel === 'ADVANCED' ? 'danger' :
                            mechanic.skillLevel === 'INTERMEDIATE' ? 'warning' : 'success'
                          }>
                            {mechanic.skillLevel}
                          </Badge>
                        </td>
                        <td>{mechanic.specialization || '-'}</td>
                        <td>
                          <Badge bg={mechanic.isAvailable ? 'success' : 'secondary'}>
                            {mechanic.isAvailable ? 'Available' : 'Busy'}
                          </Badge>
                        </td>
                        <td>
                          {mechanic.currentJobCount} / {mechanic.maxJobs}
                        </td>
                        {/* <td>
                          <span className="text-warning">
                            <i className="bi bi-star-fill"></i> {mechanic.rating || '0.0'}
                          </span>
                        </td> */}
                        {/* <td>
                          <Button variant="outline-primary" size="sm" className="me-1">
                            <i className="bi bi-eye"></i>
                          </Button> */}
                          {/* <Button variant="outline-warning" size="sm" /> to edit mechanic from admin
                          onClick={() => {
                          setEditingMechanic(mechanic);
                          setNewMechanic({
                          email: mechanic.user.email,
                          firstName: mechanic.user.firstName,
                          lastName: mechanic.user.lastName,
                          phone: mechanic.user.phone || '',
                          skillLevel: mechanic.skillLevel,
                          specialization: mechanic.specialization || '',
                          experienceYears: mechanic.experienceYears || 0
                          });
                          setShowAddMechanic(true);
                          }}
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>

            {/* Services Tab */}
            <Tab eventKey="services" title="Services">
              <div className="table-responsive">
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Service Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Duration</th>
                      <th>Skill Required</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(service => (
                      <tr key={service.id}>
                        <td>{service.id}</td>
                        <td>{service.name}</td>
                        <td>{service.description?.substring(0, 50)}...</td>
                        <td>₹{service.basePrice}</td>
                        <td>{service.durationMinutes} mins</td>
                        <td>
                          <Badge bg={
                            service.requiredSkill === 'ADVANCED' ? 'danger' :
                            service.requiredSkill === 'INTERMEDIATE' ? 'warning' : 'success'
                          }>
                            {service.requiredSkill}
                          </Badge>
                        </td>
                        <td>
                          <Badge bg={service.isActive ? 'success' : 'secondary'}>
                            {service.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td>
                          {/* <Button variant="outline-primary" size="sm" className="me-1">
                            <i className="bi bi-eye"></i>
                          </Button> */}
                          <Button variant="outline-warning" size="sm" className="me-1"
                          onClick={()=>{
                            setNewService(service);
                            setShowAddService(true);
                          }}
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button variant="outline-danger" size="sm"
                          onClick={async () => {
                          if (!window.confirm('Delete this service?')) return;
                          await serviceService.deleteService(service.id);
                          toast.success('Service deleted');
                          setActiveTab('services');
                          fetchDashboardData();

                         }}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>

            {/* Bookings Tab */}
            <Tab eventKey="bookings" title="Bookings">
              <div className="table-responsive">
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Booking #</th>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Mechanic</th>
                      <th>Vehicle</th>
                      <th>Date & Time</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      {/* <th>Actions</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking.id}>
                        <td>{booking.bookingNumber}</td>
                        <td>{booking.user?.firstName} {booking.user?.lastName}</td>
                        <td>{booking.service?.name}</td>
                        <td>
                          {booking.mechanic ? 
                            `${booking.mechanic.user?.firstName} ${booking.mechanic.user?.lastName}` : 
                            'Not Assigned'}
                        </td>
                        <td>{booking.vehicleNumber}</td>
                        <td>{booking.bookingDate} {booking.bookingTime}</td>
                        <td>{getBookingStatusBadge(booking.status)}</td>
                        <td>₹{booking.totalAmount}</td>
                        <td>
                          <Badge bg={booking.paymentStatus === 'PAID' ? 'success' : 'warning'}>
                            {booking.paymentStatus}
                          </Badge>
                        </td>
                        {/* <td>
                          <Button variant="outline-primary" size="sm" className="me-1">
                            <i className="bi bi-eye"></i>
                          </Button>
                          <Button variant="outline-info" size="sm">
                            <i className="bi bi-chat"></i>
                          </Button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </Container>
      </Container>

      {/* Add Mechanic Modal */}
      <Modal show={showAddMechanic} onHide={() => setShowAddMechanic(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Mechanic</Modal.Title>
         

        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={newMechanic.firstName}
                    onChange={(e) => setNewMechanic({...newMechanic, firstName: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={newMechanic.lastName}
                    onChange={(e) => setNewMechanic({...newMechanic, lastName: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                value={newMechanic.email}
                onChange={(e) => setNewMechanic({...newMechanic, email: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                value={newMechanic.phone}
                onChange={(e) => setNewMechanic({...newMechanic, phone: e.target.value})}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Skill Level *</Form.Label>
                  <Form.Select
                    value={newMechanic.skillLevel}
                    onChange={(e) => setNewMechanic({...newMechanic, skillLevel: e.target.value})}
                  >
                    <option value="BASIC">Basic</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control
                    type="text"
                    value={newMechanic.specialization}
                    onChange={(e) => setNewMechanic({...newMechanic, specialization: e.target.value})}
                    placeholder="e.g., Engine Specialist, AC Expert"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Alert variant="info">
              Default password: <strong>{newMechanic.password}</strong>
              <div className="mt-1">
                User will be asked to change password on first login.
              </div>
            </Alert>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddMechanic(false)}>
            Cancel
          </Button>
          {/* <Button variant="primary" onClick={handleAddMechanic}>
            Add Mechanic
          </Button> */}
          <Button
  variant={editingMechanic ? 'warning' : 'primary'}
  onClick={editingMechanic ? handleUpdateMechanic : handleAddMechanic}
>
  {editingMechanic ? 'Update Mechanic' : 'Add Mechanic'}
</Button>

        </Modal.Footer>
      </Modal>

      {/* Add Service Modal */}
      <Modal show={showAddService} onHide={() => setShowAddService(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Service Name *</Form.Label>
              <Form.Control
                type="text"
                value={newService.name}
                onChange={(e) => setNewService({...newService, name: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newService.description}
                onChange={(e) => setNewService({...newService, description: e.target.value})}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Base Price (₹) *</Form.Label>
                  <Form.Control
                    type="number"
                    value={newService.basePrice}
                    onChange={(e) => setNewService({...newService, basePrice: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duration (minutes) *</Form.Label>
                  <Form.Control
                    type="number"
                    value={newService.durationMinutes}
                    onChange={(e) => setNewService({...newService, durationMinutes: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Required Skill Level</Form.Label>
              <Form.Select
                value={newService.requiredSkill}
                onChange={(e) => setNewService({...newService, requiredSkill: e.target.value})}
              >
                <option value="BASIC">Basic</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddService(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddService}>
            Add Service
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Admin Modal */}
      <Modal show={showAddAdmin} onHide={() => setShowAddAdmin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={newAdmin.firstName}
                    onChange={(e) => setNewAdmin({...newAdmin, firstName: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={newAdmin.lastName}
                    onChange={(e) => setNewAdmin({...newAdmin, lastName: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                value={newAdmin.phone}
                onChange={(e) => setNewAdmin({...newAdmin, phone: e.target.value})}
              />
            </Form.Group>

            <Alert variant="info">
              Default password: <strong>{newAdmin.password}</strong>
              <div className="mt-1">
                Admin will be asked to change password on first login.
              </div>
            </Alert>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddAdmin(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleAddAdmin}>
            Add Admin
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminDashboard;