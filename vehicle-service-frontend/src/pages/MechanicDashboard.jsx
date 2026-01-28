import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Alert, ProgressBar } from 'react-bootstrap';
import { mechanicService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import CustomNavbar from '../components/Navbar';
import JobCard from '../components/JobCard';

const MechanicDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    totalJobs: 0,
    completedJobs: 0,
    inProgressJobs: 0,
    pendingJobs: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await mechanicService.getAssignedJobs();
      setJobs(response.data);
      
      // Calculate stats
      const total = response.data.length;
      const completed = response.data.filter(j => j.status === 'COMPLETED' || j.status === 'PAID').length;
      const inProgress = response.data.filter(j => j.status === 'IN_PROGRESS').length;
      const pending = response.data.filter(j => j.status === 'ASSIGNED' || j.status === 'PENDING').length;
      
      setStats({
        totalJobs: total,
        completedJobs: completed,
        inProgressJobs: inProgress,
        pendingJobs: pending
      });
      
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAssignedJobs = () => jobs.filter(job => 
    ['ASSIGNED', 'IN_PROGRESS'].includes(job.status)
  );

  const getCompletedJobs = () => jobs.filter(job => 
    ['COMPLETED', 'PAID'].includes(job.status)
  );

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
        {/* Mechanic Header */}
        <div className="bg-warning text-dark py-4">
          <Container>
            <Row className="align-items-center">
              <Col md={8}>
                <h1 className="h3 mb-2">Mechanic Dashboard</h1>
                <p className="mb-0">
                  Welcome, {user?.firstName}! Manage your assigned jobs here.
                </p>
              </Col>
              <Col md={4} className="text-md-end">
                <Badge bg="dark" className="fs-6 px-3 py-2">
                  Rating: 4.8/5
                </Badge>
              </Col>
            </Row>
          </Container>
        </div>

        <Container className="py-4">
          {/* Stats Overview */}
          <Row className="mb-4">
            <Col md={3}>
              <Card className="text-center border-0 shadow-sm">
                <Card.Body>
                  <h1 className="display-6 text-primary">{stats.totalJobs}</h1>
                  <Card.Text>Total Jobs</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center border-0 shadow-sm">
                <Card.Body>
                  <h1 className="display-6 text-warning">{stats.pendingJobs}</h1>
                  <Card.Text>Pending Jobs</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center border-0 shadow-sm">
                <Card.Body>
                  <h1 className="display-6 text-info">{stats.inProgressJobs}</h1>
                  <Card.Text>In Progress</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center border-0 shadow-sm">
                <Card.Body>
                  <h1 className="display-6 text-success">{stats.completedJobs}</h1>
                  <Card.Text>Completed</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Progress Bar */}
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Job Completion Progress</span>
                <span>
                  {stats.totalJobs > 0 
                    ? Math.round((stats.completedJobs / stats.totalJobs) * 100) 
                    : 0}%
                </span>
              </div>
              <ProgressBar 
                now={stats.totalJobs > 0 ? (stats.completedJobs / stats.totalJobs) * 100 : 0}
                variant="success"
                style={{ height: '10px' }}
              />
            </Card.Body>
          </Card>

          {/* Assigned Jobs Section */}
          <Row>
            <Col lg={8}>
              <Card className="mb-4">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-tools me-2"></i>
                    Assigned Jobs ({getAssignedJobs().length})
                  </h5>
                </Card.Header>
                <Card.Body>
                  {getAssignedJobs().length === 0 ? (
                    <Alert variant="info">
                      No jobs assigned at the moment. Jobs will appear here when assigned.
                    </Alert>
                  ) : (
                    getAssignedJobs().map(job => (
                      <JobCard 
                        key={job.id} 
                        job={job} 
                        onUpdate={fetchJobs}
                      />
                    ))
                  )}
                </Card.Body>
              </Card>

              {/* Completed Jobs Section */}
              <Card>
                <Card.Header className="bg-success text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-check-circle me-2"></i>
                    Recently Completed ({getCompletedJobs().slice(0, 3).length})
                  </h5>
                </Card.Header>
                <Card.Body>
                  {getCompletedJobs().length === 0 ? (
                    <Alert variant="info">
                      No completed jobs yet.
                    </Alert>
                  ) : (
                    getCompletedJobs().slice(0, 3).map(job => (
                      <Card key={job.id} className="mb-2">
                        <Card.Body className="py-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong>#{job.bookingNumber}</strong>
                              <small className="text-muted d-block">
                                {job.service?.name} - {job.vehicleNumber}
                              </small>
                            </div>
                            <div>
                              <Badge bg="success">Completed</Badge>
                              <div className="text-end">
                                <small className="text-muted">₹{job.totalAmount}</small>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    ))
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Sidebar - Quick Stats & Actions */}
            <Col lg={4}>
              {/* <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">Quick Actions</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-primary">
                      <i className="bi bi-calendar-check me-2"></i>
                      View Schedule
                    </button>
                    <button className="btn btn-outline-success">
                      <i className="bi bi-file-earmark-text me-2"></i>
                      View Reports
                    </button>
                    <button className="btn btn-outline-info">
                      <i className="bi bi-gear me-2"></i>
                      Update Profile
                    </button>
                  </div>
                </Card.Body>
              </Card> */}

              {/* <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">Today's Schedule</h5>
                </Card.Header>
                <Card.Body>
                  <div className="timeline">
                    {jobs.filter(job => job.bookingDate === new Date().toISOString().split('T')[0]).length === 0 ? (
                      <p className="text-muted text-center">No jobs scheduled for today</p>
                    ) : (
                      jobs
                        .filter(job => job.bookingDate === new Date().toISOString().split('T')[0])
                        .sort((a, b) => a.bookingTime.localeCompare(b.bookingTime))
                        .map(job => (
                          <div key={job.id} className="timeline-item mb-3">
                            <div className="d-flex">
                              <div className="timeline-time me-3">
                                <strong>{job.bookingTime}</strong>
                              </div>
                              <div>
                                <strong>{job.service?.name}</strong>
                                <small className="d-block text-muted">
                                  {job.vehicleNumber} - {job.status}
                                </small>
                              </div>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </Card.Body>
              </Card> */}

              <Card>
                <Card.Header>
                  <h5 className="mb-0">Performance Metrics</h5>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <small className="text-muted d-block">Completion Rate</small>
                    <ProgressBar 
                      now={stats.totalJobs > 0 ? (stats.completedJobs / stats.totalJobs) * 100 : 0}
                      variant="success"
                      className="mb-2"
                    />
                  </div>
                  <div className="mb-3">
                    <small className="text-muted d-block">On-Time Delivery</small>
                    <ProgressBar 
                      now={95}
                      variant="info"
                      className="mb-2"
                    />
                  </div>
                  <div>
                    <small className="text-muted d-block">Customer Rating</small>
                    <div className="d-flex align-items-center">
                      <span className="text-warning me-2">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-half"></i>
                      </span>
                      <span>4.8/5.0</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default MechanicDashboard;