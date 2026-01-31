import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8081/api'; // for spring boot backend
//const API_BASE_URL = 'https://localhost:44357/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//const PAYMENT_SERVICE_URL = 'https://localhost:44357/api';
const PAYMENT_SERVICE_URL = API_BASE_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to all requests 
//made some changes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !config.url.includes('/auth/')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authService = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  register: (userData) => 
    api.post('/auth/register', userData),
  
  changePassword: (passwordData) => 
    api.put('/auth/change-password', passwordData),


   // FORGOT PASSWORD
  forgotPassword: (email) =>
    api.post('/auth/forgot-password', null, {
      params: { email }
    }),

  // RESET PASSWORD
  resetPassword: (token, newPassword) =>
    api.post('/auth/reset-password', null, {
      params: { token, newPassword }
    })
};

// Booking API calls
export const bookingService = {
  createBooking: (bookingData) => 
    api.post('/bookings', bookingData),
  
  getMyBookings: () => 
    api.get('/bookings/my-bookings'),
  
  getBookingById: (id) => 
    api.get(`/bookings/${id}`),
  
  updateBookingStatus: (bookingId, status) => 
    api.put(`/mechanic/bookings/${bookingId}/status?status=${status}`),
  
  // processPayment: (bookingId, paymentData) => 
  //   api.post(`/bookings/${bookingId}/process-payment`, null, {
  //     params: paymentData
  //   }),
  updateBooking :(id, data) =>api.put(`/bookings/${id}`,data,{
     headers: {
      'Content-Type': 'application/json'
    }
}),
  cancelBooking: (bookingId) => 
    api.delete(`/bookings/${bookingId}`),
};

// Service API calls
export const serviceService = {
  getAllServices: () => 
    api.get('/services'),
  
  getServiceById: (id) => 
    api.get(`/services/${id}`),
  
  addService: (serviceData) => 
    api.post('/admin/services', serviceData),
  
  updateService: (id, serviceData) => 
    api.put(`/admin/services/${id}`, serviceData),
  
  deleteService: (id) => 
    api.delete(`/admin/services/${id}`),
};

// User Profile API calls
export const userService = {
  getProfile: () => 
    api.get('/user/profile'),
  
  updateProfile: (userData) => 
    api.put('/user/profile', userData),
  
  updatePassword: (passwordData) => 
    api.post('/user/change-password', passwordData),



   deleteAccount: () => api.delete('/user/delete') //SO that user can delete their account
};

// Mechanic API calls
export const mechanicService = {
  getAssignedJobs: () => 
    api.get('/mechanic/jobs'),
  
  getAllMechanics: () => 
    api.get('/admin/mechanics'),
  
  addMechanic: (mechanicData) => 
    api.post('/admin/mechanics', mechanicData),
  
  updateMechanic: (id, mechanicData) => 
    api.put(`/admin/mechanics/${id}`, mechanicData),
  
  getMechanicProfile: () => 
    api.get('/mechanic/profile'),

  toggleehaniAailability : (id) =>
    api.put(`/admin/mechanics/${id}/toggle-availability`),
};

// Admin API calls
export const adminService = {
  getAllUsers: () => 
    api.get('/admin/users'),
  
  toggleUserStatus: (userId) =>
    api.put(`/admin/users/${userId}/toggle-status`),

  getAllBookings: () => 
    api.get('/admin/bookings'),
  
  getUserStats: () => 
    api.get('/admin/stats'),
  
  createAdmin: (adminData) => 
    api.post('/admin/admins', adminData),
};

// Payment API calls
export const paymentService = {
  // createOrder: (bookingId, amount) => 
  //   axios.post(`${PAYMENT_SERVICE_URL}/payment/create-order`, {
  //     bookingId,
  //     amount,
  //     currency: 'INR'
  //   }, {
  //     headers: {
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`
  //     }
  //   }),
  
  // verifyPayment: (orderId, paymentId, signature) => 
  //   axios.post(`${PAYMENT_SERVICE_URL}/payment/confirm`, {
  //     orderId,
  //     paymentId,
  //     signature
  //   }, {
  //     headers: {
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`
  //     }
  //   }),
  createOrder: (bookingId, amount) =>
    api.post('/payment/create-order', {
      bookingId,
      amount
    }),

  verifyPayment: (bookingId, paymentId, signature) =>
    api.post(`/bookings/${bookingId}/payment/confirm`, {
      paymentId,
      signature
    })
};

export default api;