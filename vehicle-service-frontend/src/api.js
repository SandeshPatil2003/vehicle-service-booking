// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8081/api",
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;


import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';
const PAYMENT_SERVICE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
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
    api.put(`/bookings/${bookingId}/status?status=${status}`),
  
  processPayment: (bookingId, paymentData) => 
    api.post(`/bookings/${bookingId}/process-payment`, null, {
      params: paymentData
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
    api.get('/users/profile'),
  
  updateProfile: (userData) => 
    api.put('/users/profile', userData),
  
  updatePassword: (passwordData) => 
    api.put('/users/change-password', passwordData),
};

// Mechanic API calls
export const mechanicService = {
  getAssignedJobs: () => 
    api.get('/mechanics/jobs'),
  
  getAllMechanics: () => 
    api.get('/admin/mechanics'),
  
  addMechanic: (mechanicData) => 
    api.post('/admin/mechanics', mechanicData),
  
  updateMechanic: (id, mechanicData) => 
    api.put(`/admin/mechanics/${id}`, mechanicData),
  
  getMechanicProfile: () => 
    api.get('/mechanics/profile'),
};

// Admin API calls
export const adminService = {
  getAllUsers: () => 
    api.get('/admin/users'),
  
  getAllBookings: () => 
    api.get('/admin/bookings'),
  
  getUserStats: () => 
    api.get('/admin/stats'),
  
  createAdmin: (adminData) => 
    api.post('/admin/admins', adminData),
};

// Payment API calls
// export const paymentService = {
//   createOrder: (bookingId, amount) => 
//     axios.post(`${PAYMENT_SERVICE_URL}/payment/create-order`, {
//       bookingId,
//       amount,
//       currency: 'INR'
//     }, {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     }),
  
//   verifyPayment: (orderId, paymentId, signature) => 
//     axios.post(`${PAYMENT_SERVICE_URL}/payment/verify`, {
//       orderId,
//       paymentId,
//       signature
//     }, {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     }),
// };

export const paymentService = {
  createOrder: (bookingId, amount) =>
    axios.post(`${PAYMENT_SERVICE_URL}/payment/create-order`, {
      bookingId,
      amount
    }),

  verifyPayment: (bookingId, orderId, paymentId, signature) =>
    axios.post(`${PAYMENT_SERVICE_URL}/payment/verify`, {
      bookingId,
      orderId,
      paymentId,
      signature
    })
};
export default api;