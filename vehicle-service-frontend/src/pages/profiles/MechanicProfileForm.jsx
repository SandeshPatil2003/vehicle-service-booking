import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Alert, Badge } from 'react-bootstrap';
import { mechanicService } from '../../services/api';
import { toast } from 'react-toastify';

const MechanicProfileForm = ({ userData, mechanicData, onUpdate }) => {
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    
    // Professional Info
    skillLevel: mechanicData?.skillLevel || 'BASIC',
    specialization: mechanicData?.specialization || '',
    experienceYears: mechanicData?.experienceYears || 0,
    isAvailable: mechanicData?.isAvailable ?? true,
    maxJobs: mechanicData?.maxJobs || 3,
    isVerified: mechanicData?.isVerified ?? false,
    
    // Additional Info
    licenseNumber: mechanicData?.licenseNumber || '',
    aadharNumber: mechanicData?.aadharNumber || '',
    panNumber: mechanicData?.panNumber || '',
    
    // Address
    address: mechanicData?.address || '',
    workingRadius: mechanicData?.workingRadius || 10, // in km
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (formData.phone && !formData.phone.match(/^[0-9]{10}$/)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (formData.experienceYears < 0) {
      newErrors.experienceYears = 'Experience cannot be negative';
    }
    
    if (formData.maxJobs < 1 || formData.maxJobs > 10) {
      newErrors.maxJobs = 'Max jobs must be between 1 and 10';
    }
    
    if (formData.workingRadius < 1 || formData.workingRadius > 100) {
      newErrors.workingRadius = 'Working radius must be between 1 and 100 km';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setSuccess('');
    
    try {
      // Update user profile
      const userProfileData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      };
      
      await userService.updateProfile(userProfileData);
      
      // Update mechanic profile
      const mechanicProfileData = {
        skillLevel: formData.skillLevel,
        specialization: formData.specialization,
        experienceYears: parseInt(formData.experienceYears),
        isAvailable: formData.isAvailable,
        maxJobs: parseInt(formData.maxJobs),
        isVerified: formData.isVerified,
        licenseNumber: formData.licenseNumber,
        aadharNumber: formData.aadharNumber,
        panNumber: formData.panNumber,
        address: formData.address,
        workingRadius: parseInt(formData.workingRadius),
      };
      
      const response = await mechanicService.updateMechanic(
        mechanicData?.id,
        mechanicProfileData
      );
      
      onUpdate(response.data);
      setSuccess('Mechanic profile updated successfully');
      toast.success('Profile updated successfully');
      
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      skillLevel: mechanicData?.skillLevel || 'BASIC',
      specialization: mechanicData?.specialization || '',
      experienceYears: mechanicData?.experienceYears || 0,
      isAvailable: mechanicData?.isAvailable ?? true,
      maxJobs: mechanicData?.maxJobs || 3,
      isVerified: mechanicData?.isVerified ?? false,
      licenseNumber: mechanicData?.licenseNumber || '',
      aadharNumber: mechanicData?.aadharNumber || '',
      panNumber: mechanicData?.panNumber || '',
      address: mechanicData?.address || '',
      workingRadius: mechanicData?.workingRadius || 10,
    });
    setErrors({});
    setSuccess('');
  };

  const getSkillBadge = (level) => {
    const variants = {
      'BASIC': 'success',
      'INTERMEDIATE': 'warning',
      'ADVANCED': 'danger'
    };
    return <Badge bg={variants[level]}>{level}</Badge>;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Personal Information</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                  required
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
                  value={formData.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  readOnly
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                  maxLength="10"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <Card className="mb-4">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Professional Information</h5>
            {mechanicData?.rating && (
              <div className="d-flex align-items-center">
                <span className="text-warning me-1">
                  <i className="bi bi-star-fill"></i>
                </span>
                <strong>{mechanicData.rating.toFixed(1)}</strong>
                <small className="text-muted ms-1">
                  ({mechanicData.totalJobsCompleted} jobs)
                </small>
              </div>
            )}
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Skill Level *</Form.Label>
                <Form.Select
                  name="skillLevel"
                  value={formData.skillLevel}
                  onChange={handleChange}
                >
                  <option value="BASIC">Basic</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                </Form.Select>
                <div className="mt-2">
                  Current: {getSkillBadge(formData.skillLevel)}
                </div>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Specialization</Form.Label>
                <Form.Control
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="e.g., Engine Specialist, AC Expert"
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Years of Experience</Form.Label>
                <Form.Control
                  type="number"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  isInvalid={!!errors.experienceYears}
                  min="0"
                  max="50"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.experienceYears}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Maximum Jobs</Form.Label>
                <Form.Control
                  type="number"
                  name="maxJobs"
                  value={formData.maxJobs}
                  onChange={handleChange}
                  isInvalid={!!errors.maxJobs}
                  min="1"
                  max="10"
                />
                <Form.Text className="text-muted">
                  Maximum jobs you can handle at once
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.maxJobs}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Working Radius (km)</Form.Label>
                <Form.Control
                  type="number"
                  name="workingRadius"
                  value={formData.workingRadius}
                  onChange={handleChange}
                  isInvalid={!!errors.workingRadius}
                  min="1"
                  max="100"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.workingRadius}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your workshop/service address"
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="availability-switch"
                  label="Available for new jobs"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  {formData.isAvailable ? 
                    'You will receive new job assignments' : 
                    'You will not receive new jobs'}
                </Form.Text>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="verification-switch"
                  label="Profile Verified"
                  name="isVerified"
                  checked={formData.isVerified}
                  onChange={handleChange}
                  disabled={!mechanicData?.isVerified} // Only admin can change this
                />
                <Form.Text className="text-muted">
                  {formData.isVerified ? 
                    'Your profile is verified by admin' : 
                    'Profile verification pending'}
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Professional Documents</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>License Number</Form.Label>
                <Form.Control
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="Mechanic license number"
                />
              </Form.Group>
            </Col>
            
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Aadhar Number</Form.Label>
                <Form.Control
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  placeholder="12-digit Aadhar number"
                  maxLength="12"
                />
              </Form.Group>
            </Col>
            
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>PAN Number</Form.Label>
                <Form.Control
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  placeholder="10-digit PAN number"
                  maxLength="10"
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Alert variant="info" className="mt-3">
            <i className="bi bi-info-circle me-2"></i>
            Document verification helps build trust with customers. 
            All documents are securely stored and verified by our admin team.
          </Alert>
        </Card.Body>
      </Card>
      
      {success && (
        <Alert variant="success" className="mb-4">
          <i className="bi bi-check-circle me-2"></i>
          {success}
        </Alert>
      )}
      
      <div className="d-flex justify-content-between">
        <Button
          variant="outline-secondary"
          onClick={handleReset}
          disabled={loading}
        >
          <i className="bi bi-arrow-clockwise me-2"></i>
          Reset
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Updating...
            </>
          ) : (
            <>
              <i className="bi bi-tools me-2"></i>
              Update Professional Profile
            </>
          )}
        </Button>
      </div>
    </Form>
  );
};

export default MechanicProfileForm;