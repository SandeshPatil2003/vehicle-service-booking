import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tabs, Tab, Badge } from 'react-bootstrap';
import { userService, authService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import CustomNavbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const validateProfile = () => {
    const newErrors = {};
    
    if (!profileData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!profileData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (profileData.phone && !profileData.phone.match(/^[0-9]{10}$/)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'New password must be at least 6 characters';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateProfile()) return;
    
    setLoading(true);
    
    try {
      await userService.updateProfile(profileData);
      updateUser(profileData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  //added this so that user can delete account
  const handleDeleteAccount = async () => {
  const confirmDelete = window.confirm(
    "Are you sure? This action cannot be undone!"
  );

  if (!confirmDelete) return;

  try {
    await userService.deleteAccount();

    toast.success("Account deleted successfully");

    // clear auth
    localStorage.removeItem("token");
localStorage.removeItem("user");
window.location.href = "/login";

    // localStorage.removeItem("token");
    // localStorage.removeItem("user");

    // navigate("/login");
  } catch (error) {
    toast.error(
      error.response?.data || "Failed to delete account"
    );
  }
};


  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) return;
    
    setLoading(true);
    
    try {
      await userService.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
         confirmPassword: passwordData.confirmPassword // made changes added this line


      });
      
      toast.success('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomNavbar />
      
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow">
              <Card.Header className="bg-white">
                <h3 className="mb-0">My Profile</h3>
                <p className="text-muted mb-0">Manage your account settings</p>
              </Card.Header>
              <Card.Body>
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-4"
                >
                  <Tab eventKey="profile" title="Profile Information">
                    <div className="mt-4">
                      <Form onSubmit={handleProfileSubmit}>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>First Name *</Form.Label>
                              <Form.Control
                                type="text"
                                name="firstName"
                                value={profileData.firstName}
                                onChange={handleProfileChange}
                                isInvalid={!!errors.firstName}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Last Name *</Form.Label>
                              <Form.Control
                                type="text"
                                name="lastName"
                                value={profileData.lastName}
                                onChange={handleProfileChange}
                                isInvalid={!!errors.lastName}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            value={profileData.email}
                            disabled
                          />
                          <Form.Text className="text-muted">
                            Email cannot be changed
                          </Form.Text>
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            isInvalid={!!errors.phone}
                            placeholder="Enter 10-digit phone number"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phone}
                          </Form.Control.Feedback>
                        </Form.Group>
                        
                        <div className="d-flex justify-content-end">
                          <Button 
                            type="submit" 
                            variant="primary"
                            disabled={loading}
                          >
                            {loading ? 'Updating...' : 'Update Profile'}
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </Tab>
                  
                  <Tab eventKey="password" title="Change Password">
                    <div className="mt-4">
                      <Form onSubmit={handlePasswordSubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label>Current Password *</Form.Label>
                          <Form.Control
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            isInvalid={!!errors.currentPassword}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.currentPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>New Password *</Form.Label>
                          <Form.Control
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            isInvalid={!!errors.newPassword}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.newPassword}
                          </Form.Control.Feedback>
                          <Form.Text className="text-muted">
                            Minimum 6 characters
                          </Form.Text>
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                          <Form.Label>Confirm New Password *</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            isInvalid={!!errors.confirmPassword}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                        
                        <div className="d-flex justify-content-end">
                          <Button 
                            type="submit" 
                            variant="primary"
                            disabled={loading}
                          >
                            {loading ? 'Updating...' : 'Change Password'}
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </Tab>
                  
                  <Tab eventKey="account" title="Account Settings">
                    <div className="mt-4">
                      <h5>Account Information</h5>
                      <div className="table-responsive">
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <th width="200">Account Type</th>
                              <td>
                                <span className={`badge bg-${
                                  user?.role === 'ADMIN' ? 'danger' :
                                  user?.role === 'MECHANIC' ? 'warning' : 'info'
                                }`}>
                                  {user?.role}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <th>Member Since</th>
                              <td>{new Date().toLocaleDateString()}</td>
                            </tr>
                            <tr>
                              <th>Account Status</th>
                              <td>
                                <Badge bg="success">Active</Badge>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-4">
                        <h5 className="text-danger">Danger Zone</h5>
                        <Alert variant="danger">
                          <Alert.Heading>Delete Account</Alert.Heading>
                          <p>
                            Once you delete your account, there is no going back. 
                            Please be certain.
                          </p>
                          <hr />
                          <div className="d-flex justify-content-end">
                            <Button variant="outline-danger"  onClick={handleDeleteAccount}>
                              Delete My Account
                            </Button>
                          </div>
                        </Alert>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;