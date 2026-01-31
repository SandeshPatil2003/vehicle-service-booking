import React from 'react';
import { Card, Button, Badge, ProgressBar } from 'react-bootstrap';
import { bookingService } from '../services/api';
import { toast } from 'react-toastify';

const JobCard = ({ job, onUpdate }) => {
  const getStatusBadge = (status) => {
    const variants = {
      'PENDING': 'secondary',
      'ASSIGNED': 'info',
      'IN_PROGRESS': 'primary',
      'COMPLETED': 'success',
      'PAID': 'success',
      'CANCELLED': 'danger'
    };
    return <Badge bg={variants[status]}>{status.replace('_', ' ')}</Badge>;
  };

  const getStatusSteps = () => {
    const steps = ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'PAID'];
    const currentIndex = steps.indexOf(job.status);
    return steps.map((step, index) => ({
      step,
      active: index <= currentIndex
    }));
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await bookingService.updateBookingStatus(job.id, newStatus);
      toast.success(`Job status updated to ${newStatus}`);
      onUpdate();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getNextStatus = () => {
    switch (job.status) {
      case 'ASSIGNED': return 'IN_PROGRESS';
      case 'IN_PROGRESS': return 'COMPLETED';
      default: return null;
    }
  };

  const nextStatus = getNextStatus();

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <Card.Title className="mb-1">Job #{job.bookingNumber}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {job.service?.name} - {job.vehicleNumber}
            </Card.Subtitle>
          </div>
          <div className="d-flex align-items-center gap-2">
            {getStatusBadge(job.status)}
            <Badge bg="light" text="dark">
              ₹{job.totalAmount}
            </Badge>
          </div>
        </div>

        <div className="mb-3">
          <small className="text-muted d-block">Customer: {job.user?.firstName} {job.user?.lastName}</small>
          <small className="text-muted d-block">Vehicle: {job.vehicleType} - {job.vehicleModel}</small>
          <small className="text-muted d-block">Date: {job.bookingDate} at {job.bookingTime}</small>
          {job.problemDescription && (
            <small className="text-muted d-block mt-2">
              Issue: {job.problemDescription}
            </small>
          )}
        </div>

        {/* Status Progress */}
        <div className="mb-3">
          <div className="d-flex justify-content-between mb-1">
            {getStatusSteps().map((step, index) => (
              <small 
                key={step.step} 
                className={step.active ? 'text-primary fw-bold' : 'text-muted'}
              >
                {step.step.charAt(0)}
              </small>
            ))}
          </div>
          <ProgressBar 
            now={(getStatusSteps().filter(s => s.active).length / getStatusSteps().length) * 100}
            style={{ height: '3px' }}
          />
        </div>

        {/* Action Buttons */}
        {nextStatus && (
          <div className="d-flex gap-2">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={() => handleStatusUpdate(nextStatus)}
            >
              {nextStatus === 'IN_PROGRESS' ? 'Start Job' : 'Mark Complete'}
            </Button>
            {/* <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={() => console.log('View details')}
            >
              View Details
            </Button> */}
          </div>
        )}

        {job.status === 'COMPLETED' && (
          <div className="alert alert-success mt-3 mb-0 py-2">
            <small>
              <i className="bi bi-check-circle me-1"></i>
              Job completed. Waiting for customer payment.
            </small>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default JobCard;