// import { isLoggedIn, getRole, logout } from "../auth";

// function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
//       <span className="navbar-brand">VehicleService</span>

//       <div className="ms-auto">
//         {!isLoggedIn() && <a href="/login" className="btn btn-outline-light me-2">Login</a>}
//         {!isLoggedIn() && <a href="/register" className="btn btn-light">Register</a>}

//         {isLoggedIn() && getRole() === "USER" && (
//           <a href="/user" className="btn btn-outline-light me-2">Dashboard</a>
//         )}

//         {isLoggedIn() && <button onClick={logout} className="btn btn-danger">Logout</button>}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserInitials } from '../services/auth';

const CustomNavbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // const getNavItems = () => {
  //   if (!user) return null;

  //   switch (user.role) {
  //     case 'CUSTOMER':
  //       return (
  //         <>
  //           <Nav.Link as={Link} to="/customer">Dashboard</Nav.Link>
  //           {/* <Nav.Link as={Link} to="/services">Services</Nav.Link> */}
  //           <Nav.Link as={Link} to="/customer/bookings">My Bookings</Nav.Link>
  //           <Nav.Link as={Link} to="/customer/history">History</Nav.Link>
  //         </>
  //       );
  //     case 'MECHANIC':
  //       return (
  //         <>
  //           <Nav.Link as={Link} to="/mechanic">Dashboard</Nav.Link>
  //           <Nav.Link as={Link} to="/mechanic/jobs">Assigned Jobs</Nav.Link>
  //           <Nav.Link as={Link} to="/mechanic/profile">Profile</Nav.Link>
  //         </>
  //       );
  //     case 'ADMIN':
  //       return (
  //         <>
  //           <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
  //           {/* <Nav.Link as={Link} to="/admin/users">Users</Nav.Link>
  //           <Nav.Link as={Link} to="/admin/mechanics">Mechanics</Nav.Link>
  //           <Nav.Link as={Link} to="/admin/services">Services</Nav.Link>
  //           <Nav.Link as={Link} to="/admin/bookings">Bookings</Nav.Link> */}
  //         </>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  const getRoleNavItems = () => {
  if (!user) return null;

  switch (user.role) {
    case 'CUSTOMER':
      return (
        <>
          <Nav.Link as={Link} to="/customer">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/customer?tab=active">My Bookings</Nav.Link>
          <Nav.Link as={Link} to="/customer/history">History</Nav.Link>
        </>
      );

    case 'MECHANIC':
      return (
        <>
          <Nav.Link as={Link} to="/mechanic">Dashboard</Nav.Link>
          {/* <Nav.Link as={Link} to="/mechanic/jobs">Assigned Jobs</Nav.Link> */}
        </>
      );

    case 'ADMIN':
      return (
        <>
          <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
        </>
      );

    default:
      return null;
  }
};


  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🚗 Vehicle Service System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {/* <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/services">Services</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            {isAuthenticated() && getNavItems()}
          </Nav> */}
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/services">Services</Nav.Link>

           {isAuthenticated() && getRoleNavItems()}

          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>

          <Nav>
            {isAuthenticated() ? (
              <NavDropdown 
                title={
                  <div className="d-inline-flex align-items-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" 
                         style={{width: '32px', height: '32px', marginRight: '8px'}}>
                      {getUserInitials()}
                    </div>
                    <span>{user?.firstName} {user?.lastName}</span>
                    <Badge bg={user?.role === 'ADMIN' ? 'danger' : 
                              user?.role === 'MECHANIC' ? 'warning' : 'info'} 
                           className="ms-2">
                      {user?.role}
                    </Badge>
                  </div>
                } 
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  <i className="bi bi-person me-2"></i>Profile
                </NavDropdown.Item>
                {/* <NavDropdown.Item as={Link} to="/settings">
                  <i className="bi bi-gear me-2"></i>Settings
                </NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="btn btn-outline-light me-2">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="btn btn-primary">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;