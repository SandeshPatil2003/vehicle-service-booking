import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages/Screen
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import MechanicDashboard from "./pages/MechanicDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BookingPage from "./pages/BookingPage";
import Profile from "./pages/Profile";
import BookingHistory from "./pages/BookingHistory";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EditBooking from "./pages/EditBooking";
import FloatingSupport from "./pages/FloatingSupport";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <FloatingSupport />

          <Routes>
            {/* Public Routes  which is public to everyone*/}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/support" element={<Support />} />

            {/* Customer Protected Routes */}
            <Route
              path="/customer"
              element={
                <ProtectedRoute requiredRole="CUSTOMER">
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/bookings"
              element={
                <ProtectedRoute requiredRole="CUSTOMER">
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/history"
              element={
                <ProtectedRoute requiredRole="CUSTOMER">
                  <BookingHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/:serviceId"
              element={
                <ProtectedRoute requiredRole="CUSTOMER">
                  <BookingPage />
                </ProtectedRoute>
              }
            />

            {/* Mechanic Protected Routes */}
            <Route
              path="/mechanic"
              element={
                <ProtectedRoute requiredRole="MECHANIC">
                  <MechanicDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mechanic/jobs"
              element={
                <ProtectedRoute requiredRole="MECHANIC">
                  <MechanicDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/mechanics"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/services"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Common Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Service page route */}
            {/* <Route path="/services" element={
                <ProtectedRoute requiredRole="CUSTOMER">
                    <Services />
                </ProtectedRoute>
            }/> */}
            <Route path="/services" element={<Services />} />

            {/* About page Route */}
            <Route path="/about" element={<About />} />

            {/* Contact page route */}
            <Route path="/contact" element={<Contact />} />

            {/* Error Routes */}
            <Route
              path="/unauthorized"
              element={
                <div className="text-center py-5">
                  <h1>401 - Unauthorized</h1>
                  <p>You don't have permission to access this page.</p>
                </div>
              }
            />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />

            <Route path="/booking/edit/:id" element={<EditBooking />} />
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
