import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Tabs, Tab, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from '../../components/Navbar';
import CustomerProfileForm from './CustomerProfileForm';
import MechanicProfileForm from './MechanicProfileForm';
import AdminProfileForm from './AdminProfileForm';
import ChangePasswordForm from './ChangePasswordForm';
import { userService, mechanicService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [mechanicData, setMechanicData] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchUserData();
  }, [user, navigate]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch user profile
      const userResponse = await userService.getProfile();
      setUserData(userResponse.data);
      
      // If user is a mechanic, fetch mechanic details
      if (user?.role === 'MECHANIC') {
        try {
          const mechanicResponse = await mechanicService.getMechanicProfile();
          setMechanicData(mechanicResponse.data);
        } catch (error) {
          console.warn('Mechanic profile not found or user is not a mechanic');
        }
      }
    } catch (error) {
      toast.error('Failed to load profile data');
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (updatedData) => {
    // Update user data in state
    setUserData(prev => ({ ...prev, ...updatedData }));
    
    // Update auth context
    updateUser(updatedData);
    
    toast.success('Profile updated successfully');
  };

  const handleMechanicUpdate = (updatedData) => {
    setMechanicData(prev => ({ ...prev, ...updatedData }));
    toast.success('Mechanic profile updated successfully');
  };

  if (loading) {
    return (
      <>
        <CustomNavbar />
        <Container className="py-5">
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Container>
      </>
    );
  }

  if (!userData) {
    return (
      <>
        <CustomNavbar />
        <Container className="py-5">
          <Alert variant="danger">
            Failed to load profile data. Please try again later.
          </Alert>
        </Container>
      </>
    );
  }

  const getRoleBasedTabs = () => {
    const commonTabs = [
      { key: 'profile', title: 'Profile Info' },
      { key: 'password', title: 'Change Password' },
    ];

    if (user?.role === 'MECHANIC') {
      return [
        { key: 'profile', title: 'Personal Info' },
        { key: 'professional', title: 'Professional Info' },
        { key: 'password', title: 'Change Password' },
      ];
    }

    if (user?.role === 'ADMIN') {
      return [
        { key: 'profile', title: 'Admin Profile' },
        { key: 'system', title: 'System Settings' },
        { key: 'password', title: 'Change Password' },
      ];
    }

    return commonTabs;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <CustomerProfileForm
            userData={userData}
            onUpdate={handleProfileUpdate}
          />
        );
      case 'professional':
        return (
          <MechanicProfileForm
            userData={userData}
            mechanicData={mechanicData}
            onUpdate={handleMechanicUpdate}
          />
        );
      case 'system':
        return (
          <AdminProfileForm
            userData={userData}
            onUpdate={handleProfileUpdate}
          />
        );
      case 'password':
        return (
          <ChangePasswordForm />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <CustomNavbar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <Card className="shadow">
              <Card.Header className="bg-white border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="mb-1">Edit Profile</h3>
                    <p className="text-muted mb-0">
                      Manage your {user?.role?.toLowerCase()} account information
                    </p>
                  </div>
                  <div>
                    <span className={`badge bg-${
                      user?.role === 'ADMIN' ? 'danger' :
                      user?.role === 'MECHANIC' ? 'warning' : 'info'
                    } fs-6 px-3 py-2`}>
                      {user?.role}
                    </span>
                  </div>
                </div>
              </Card.Header>
              
              <Card.Body>
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-4 border-bottom"
                  fill
                >
                  {getRoleBasedTabs().map(tab => (
                    <Tab
                      key={tab.key}
                      eventKey={tab.key}
                      title={
                        <div className="d-flex align-items-center">
                          <i className={`bi bi-${
                            tab.key === 'profile' ? 'person' :
                            tab.key === 'professional' ? 'tools' :
                            tab.key === 'system' ? 'gear' :
                            'key'
                          } me-2`}></i>
                          {tab.title}
                        </div>
                      }
                    />
                  ))}
                </Tabs>

                <div className="mt-4">
                  {renderTabContent()}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditProfile;