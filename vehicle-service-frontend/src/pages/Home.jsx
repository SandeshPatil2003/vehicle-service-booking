// // // import "./Home.css";

// // // function Home() {
// // //   return (
// // //     <>
// // //       {/* NAVBAR */}
// // //       <nav className="navbar">
// // //         <div className="logo">VehicleService</div>

// // //         <ul className="nav-links">
// // //           <li>Home</li>
// // //           <li>Services</li>
// // //           <li>Login</li>
// // //         </ul>
// // //       </nav>

// // //       {/* INTRO + LOGIN */}
// // //       <section className="hero">
// // //         <div className="intro">
// // //           <h2>Book Vehicle Services Easily</h2>
// // //           <p>
// // //             We provide reliable vehicle servicing with skilled mechanics.
// // //             Choose your services, book instantly, and relax.
// // //           </p>
// // //         </div>

// // //         <div className="login-box">
// // //           <h3>Login</h3>
// // //           <input type="email" placeholder="Email" />
// // //           <input type="password" placeholder="Password" />
// // //           <button>Login</button>
// // //         </div>
// // //       </section>

// // //       {/* SERVICES */}
// // //       <section className="services">
// // //         <h2>Our Services</h2>

// // //         <div className="service-cards">
// // //           <div className="card">
// // //             <h3>Oil Change</h3>
// // //             <p>Complete engine oil replacement</p>
// // //             <button>Book</button>
// // //           </div>

// // //           <div className="card">
// // //             <h3>Tire Repair</h3>
// // //             <p>Wheel alignment and puncture repair</p>
// // //             <button>Book</button>
// // //           </div>

// // //           <div className="card">
// // //             <h3>Full Service</h3>
// // //             <p>Complete vehicle checkup</p>
// // //             <button>Book</button>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* EXTRA SECTION */}
// // //       <section className="extra">
// // //         <h2>Why Choose Us?</h2>
// // //         <p>
// // //           ✔ Skilled Mechanics <br />
// // //           ✔ Fast Service <br />
// // //           ✔ Affordable Pricing
// // //         </p>
// // //       </section>

// // //       {/* FOOTER */}
// // //       <footer className="footer">
// // //         <p>© 2026 VehicleService Booking System</p>
// // //       </footer>
// // //     </>
// // //   );
// // // }

// // // export default Home;




// // // Code from black box ai

// // // import './Home.css'

// // // function Home() {
// // //   // Hardcoded services data for demo
// // //   const services = [
// // //     {
// // //       name: 'Oil Change',
// // //       description: 'Quick and efficient oil change service to keep your engine running smoothly.'
// // //     },
// // //     {
// // //       name: 'Tire Repair',
// // //       description: 'Professional tire repair and replacement for safe driving.'
// // //     },
// // //     {
// // //       name: 'Full Service',
// // //       description: 'Comprehensive vehicle maintenance including inspection, cleaning, and more.'
// // //     }
// // //   ]

// // //   return (
// // //     <div>
// // //       {/* Navbar */}
// // //       <nav className="navbar navbar-expand-lg navbar-light bg-light">
// // //         <div className="container-fluid">
// // //           <a className="navbar-brand" href="#">VehicleService</a>
// // //           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
// // //             <span className="navbar-toggler-icon"></span>
// // //           </button>
// // //           <div className="collapse navbar-collapse" id="navbarNav">
// // //             <ul className="navbar-nav ms-auto">
// // //               <li className="nav-item">
// // //                 <a className="nav-link active" aria-current="page" href="#">Home</a>
// // //               </li>
// // //               <li className="nav-item">
// // //                 <a className="nav-link" href="#">Services</a>
// // //               </li>
// // //               <li className="nav-item">
// // //                 <a className="nav-link" href="#">Login</a>
// // //               </li>
// // //             </ul>
// // //           </div>
// // //         </div>
// // //       </nav>

// // //       {/* Hero Section */}
// // //       <section className="hero bg-primary text-white py-5">
// // //         <div className="container">
// // //           <div className="row align-items-center">
// // //             <div className="col-md-6">
// // //               <h1>Welcome to Vehicle Service Booking</h1>
// // //               <p>Book your vehicle maintenance services online with ease. Our expert team ensures your car is in top condition.</p>
// // //               <p>Get started today and drive worry-free!</p>
// // //             </div>
// // //             <div className="col-md-6">
// // //               <div className="card p-4">
// // //                 <h5 className="card-title">Login</h5>
// // //                 <form>
// // //                   <div className="mb-3">
// // //                     <label htmlFor="email" className="form-label">Email</label>
// // //                     <input type="email" className="form-control" id="email" placeholder="Enter your email" />
// // //                   </div>
// // //                   <div className="mb-3">
// // //                     <label htmlFor="password" className="form-label">Password</label>
// // //                     <input type="password" className="form-control" id="password" placeholder="Enter your password" />
// // //                   </div>
// // //                   <button type="submit" className="btn btn-primary w-100">Login</button>
// // //                 </form>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Services Section */}
// // //       <section className="services py-5">
// // //         <div className="container">
// // //           <h2 className="text-center mb-4">Our Services</h2>
// // //           <div className="row">
// // //             {services.map((service, index) => (
// // //               <div key={index} className="col-md-4 mb-4">
// // //                 <div className="card h-100">
// // //                   <div className="card-body">
// // //                     <h5 className="card-title">{service.name}</h5>
// // //                     <p className="card-text">{service.description}</p>
// // //                     <button className="btn btn-primary">Book</button>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Additional Section */}
// // //       <section className="why-choose-us bg-light py-5">
// // //         <div className="container">
// // //           <h2 className="text-center mb-4">Why Choose Us?</h2>
// // //           <ul className="list-unstyled">
// // //             <li><strong>Expert Technicians:</strong> Our certified mechanics provide top-notch service.</li>
// // //             <li><strong>Quick Turnaround:</strong> Fast and efficient booking with minimal wait times.</li>
// // //             <li><strong>Affordable Pricing:</strong> Competitive rates without compromising quality.</li>
// // //             <li><strong>Convenient Online Booking:</strong> Schedule services from the comfort of your home.</li>
// // //           </ul>
// // //         </div>
// // //       </section>

// // //       {/* Footer */}
// // //       <footer className="bg-dark text-white text-center py-3">
// // //         <p>&copy; 2023 VehicleService. All rights reserved.</p>
// // //       </footer>
// // //     </div>
// // //   )
// // // }

// // // export default Home



// // // updated code from 


// // import Navbar from "../components/Navbar"
// // function Home() {
// //   // Hardcoded services data
// //   const services = [
// //     {
// //       icon: 'bi-gear-fill',
// //       name: 'Oil Change',
// //       description: 'Quick oil replacement to keep your engine smooth and efficient.'
// //     },
// //     {
// //       icon: 'bi-tools',
// //       name: 'Tire Repair',
// //       description: 'Expert tire fixing and balancing for safe, reliable driving.'
// //     },
// //     {
// //       icon: 'bi-car-front-fill',
// //       name: 'Full Vehicle Service',
// //       description: 'Comprehensive check-up including brakes, fluids, and more.'
// //     }
// //   ]

// //   // Hardcoded features data
// //   const features = [
// //     {
// //       icon: 'bi-person-check-fill',
// //       name: 'Skilled Mechanics',
// //       description: 'Certified professionals ensuring top-quality service.'
// //     },
// //     {
// //       icon: 'bi-list-check',
// //       name: 'Multiple Services in One Booking',
// //       description: 'Combine services for convenience and savings.'
// //     },
// //     {
// //       icon: 'bi-shield-lock-fill',
// //       name: 'Role-Based Access',
// //       description: 'Secure access tailored to users and admins.'
// //     },
// //     {
// //       icon: 'bi-lock-fill',
// //       name: 'Secure & Reliable',
// //       description: 'End-to-end encryption and trusted platform.'
// //     }
// //   ]

// //   return (

// //     <div className="bg-white">
// //        <Navbar />
// //       {/* Top Navigation Bar */}
// //       <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
// //         <div className="container">
// //           <a className="navbar-brand fw-bold text-primary" href="#">VehicleService</a>
// //           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
// //             <span className="navbar-toggler-icon"></span>
// //           </button>
// //           <div className="collapse navbar-collapse" id="navbarNav">
// //             <ul className="navbar-nav ms-auto">
// //               <li className="nav-item">
// //                 <a className="nav-link text-dark" href="#">Home</a>
// //               </li>
// //               <li className="nav-item">
// //                 <a className="nav-link text-dark" href="#">Services</a>
// //               </li>
// //               <li className="nav-item">
// //                 <a className="nav-link text-dark" href="#">Login</a>
// //               </li>
// //             </ul>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Hero Section */}
// //       <section className="hero py-5">
// //         <div className="container text-center">
// //           <h1 className="display-4 fw-bold text-dark mb-3">Book Vehicle Services Effortlessly</h1>
// //           <p className="lead text-muted mb-4">Choose services, get skilled mechanics, and track your booking seamlessly.</p>
// //           <div className="d-flex justify-content-center gap-3 flex-wrap">
// //             <button className="btn btn-primary btn-lg rounded-pill px-4">Get Started</button>
// //             <button className="btn btn-outline-secondary btn-lg rounded-pill px-4">View Services</button>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Login Card Section */}
// //       {/* <section className="login-section py-5 bg-light">
// //         <div className="container">
// //           <div className="row justify-content-end">
// //             <div className="col-md-6 col-lg-4">
// //               <div className="card shadow-sm rounded-3 p-4">
// //                 <h5 className="card-title text-center mb-4 fw-bold">Login</h5>
// //                 <form>
// //                   <div className="mb-3">
// //             <label htmlFor="email" className="form-label text-muted">Email</label>
// //                     <input type="email" className="form-control rounded-pill" id="email" placeholder="Enter your email" />
// //                   </div>
// //                   <div className="mb-3">
// //                     <label htmlFor="password" className="form-label text-muted">Password</label>
// //                     <input type="password" className="form-control rounded-pill" id="password" placeholder="Enter your password" />
// //                   </div>
// //                   <button type="submit" className="btn btn-primary w-100 rounded-pill">Login</button>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section> */}

// // <section className="login-section py-5 bg-light">
// //   <div className="container">
// //     <div className="row align-items-center">

// //       {/* LEFT SIDE MESSAGE */}
// //       <div className="col-md-6">
// //         <h2 className="fw-bold mb-3">
// //           Welcome to Vehicle Service Booking
// //         </h2>
// //         <p className="text-muted fs-5">
// //           Book multiple vehicle services in one place, get skilled mechanics,
// //           and track your booking in real time.
// //         </p>
// //         <ul className="text-muted">
// //           <li>✔ Multiple services in one booking</li>
// //           <li>✔ Skilled & verified mechanics</li>
// //           <li>✔ Role-based secure access</li>
// //         </ul>
// //       </div>

// //       {/* RIGHT SIDE LOGIN CARD */}
// //       <div className="col-md-6 col-lg-4 offset-lg-2">
// //         <div className="card shadow-sm rounded-3 p-4">
// //           <h5 className="card-title text-center mb-4 fw-bold">
// //             Login
// //           </h5>

// //           <form>
// //             <div className="mb-3">
// //               <label className="form-label text-muted">
// //                 Email
// //               </label>
// //               <input
// //                 type="email"
// //                 className="form-control rounded-pill"
// //                 placeholder="Enter your email"
// //               />
// //             </div>

// //             <div className="mb-3">
// //               <label className="form-label text-muted">
// //                 Password
// //               </label>
// //               <input
// //                 type="password"
// //                 className="form-control rounded-pill"
// //                 placeholder="Enter your password"
// //               />
// //             </div>

// //             <button
// //               type="submit"
// //               className="btn btn-primary w-100 rounded-pill"
// //             >
// //               Login
// //             </button>
// //           </form>
// //         </div>
// //       </div>

// //     </div>
// //   </div>
// // </section>

// //       {/* Services Section */}
// //       <section className="services py-5">
// //         <div className="container">
// //           <h2 className="text-center mb-5 fw-bold text-dark">Our Services</h2>
// //           <div className="row g-4">
// //             {services.map((service, index) => (
// //               <div key={index} className="col-md-4">
// //                 <div className="card shadow-sm rounded-3 h-100 text-center p-4">
// //                   <div className="mb-3">
// //                     <i className={`bi ${service.icon} fs-1 text-primary`}></i>
// //                   </div>
// //                   <h5 className="card-title fw-bold">{service.name}</h5>
// //                   <p className="card-text text-muted">{service.description}</p>
// //                   <button className="btn btn-primary rounded-pill mt-auto">Book Service</button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Features / Why Choose Us Section */}
// //       <section className="features py-5 bg-light">
// //         <div className="container">
// //           <h2 className="text-center mb-5 fw-bold text-dark">Why Choose Us?</h2>
// //           <div className="row g-4">
// //             {features.map((feature, index) => (
// //               <div key={index} className="col-md-3">
// //                 <div className="card shadow-sm rounded-3 h-100 text-center p-4 border-0">
// //                   <div className="mb-3">
// //                     <i className={`bi ${feature.icon} fs-1 text-primary`}></i>
// //                   </div>
// //                   <h5 className="card-title fw-bold">{feature.name}</h5>
// //                   <p className="card-text text-muted">{feature.description}</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Footer */}
// //       <footer className="bg-dark text-white text-center py-4">
// //         <p className="mb-0">&copy; 2026 Vehicle Service Booking System</p>
// //       </footer>
// //     </div>
// //   )
// // }

// // export default Home


// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { serviceService } from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import ServiceCard from '../components/ServiceCard';
// import CustomNavbar from '../components/Navbar';
// import SupportChatbot from './SupportChatbot';

// const Home = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { isAuthenticated, user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const response = await serviceService.getAllServices();
//       setServices(response.data.slice(0, 6)); // Show only 6 services on home page
//     } catch (err) {
//       setError('Failed to load services');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBookService = (serviceId) => {
//     if (!isAuthenticated()) {
//       navigate('/login', { state: { from: `/booking/${serviceId}` } });
//     } else if (user?.role !== 'CUSTOMER') {
//       alert('Only customers can book services');
//     } else {
//       navigate(`/booking/${serviceId}`);
//     }
//   };

//   return (
//     <>
//       <CustomNavbar />
      

       
//       {/* Hero Section */}
//       <section className="hero-section bg-primary text-white py-5">
//         <Container>
//           <Row className="align-items-center">
//             <Col lg={6}>
//               <h1 className="display-4 fw-bold mb-4">
//                 Professional Vehicle Service at Your Doorstep
//               </h1>
//               <p className="lead mb-4">
//                 Book expert mechanics for your vehicle service. 
//                 We provide quality service with transparent pricing and convenient scheduling.
//               </p>
//               <div className="d-flex gap-3">
//                 {!isAuthenticated() ? (
//                   <>
//                     <Button as={Link} to="/register" variant="light" size="lg">
//                       Get Started
//                     </Button>
//                     <Button as={Link} to="/login" variant="outline-light" size="lg">
//                       Login
//                     </Button>
//                   </>
//                 ) : (
//                   <Button 
//                     as={Link} 
//                     to={user?.role === 'CUSTOMER' ? '/customer' : 
//                         user?.role === 'MECHANIC' ? '/mechanic' : '/admin'} 
//                     variant="light" 
//                     size="lg"
//                   >
//                     Go to Dashboard
//                   </Button>
//                 )}
//               </div>
//             </Col>
//             <Col lg={6}>
//               <div className="text-center">
//                 <img 
//                   src="https://cdn-icons-png.flaticon.com/512/1995/1995463.png" 
//                   alt="Vehicle Service" 
//                   className="img-fluid"
//                   style={{ maxHeight: '300px' }}
//                 />
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       {/* Quick Login Section (only for non-authenticated users) */}
//       {!isAuthenticated() && (
//         <section className="py-5 bg-light">
//           <Container>
//             <Row className="justify-content-center">
//               <Col md={8} lg={6}>
//                 <Card className="shadow">
//                   <Card.Body className="p-5">
//                     <h3 className="text-center mb-4">Quick Login</h3>
//                     <Alert variant="info" className="text-center">
//                       Please login to book services or access your dashboard
//                     </Alert>
//                     <div className="text-center mt-4">
//                       <Button 
//                         as={Link} 
//                         to="/login" 
//                         variant="primary" 
//                         size="lg"
//                         className="px-5"
//                       >
//                         Login Now
//                       </Button>
//                       <p className="mt-3">
//                         Don't have an account?{' '}
//                         <Link to="/register" className="text-decoration-none">
//                           Register here
//                         </Link>
//                       </p>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>
//           </Container>
//         </section>
//       )}

//       {/* Services Section */}
//       <section className="py-5">
//         <Container>
//           <div className="text-center mb-5">
//             <h2>Our Services</h2>
//             <p className="lead text-muted">
//               Choose from our wide range of professional vehicle services
//             </p>
//           </div>

//           {loading ? (
//             <div className="text-center">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </div>
//           ) : error ? (
//             <Alert variant="danger">{error}</Alert>
//           ) : (
//             <Row>
//               {services.map(service => (
//                 <Col key={service.id} lg={4} md={6} className="mb-4">
//                   <ServiceCard service={service}/>
//                 </Col>
//               ))}
//             </Row>
//           )}

//           <div className="text-center mt-4">
//             <Button as={Link} to="/services" variant="outline-primary">
//               View All Services
//             </Button>
//           </div>
//         </Container>
//       </section>
//           {/* <div className="support-chatbot-float">
//   <SupportChatbot />
// </div> */}

    


//       {/* Features Section */}
//       <section className="py-5 bg-light">
//         <Container>
//           <div className="text-center mb-5">
//             <h2>Why Choose Us?</h2>
//           </div>
//           <Row>
//             <Col md={4} className="text-center mb-4">
//               <div className="feature-icon mb-3">
//                 <i className="bi bi-tools display-4 text-primary"></i>
//               </div>
//               <h4>Expert Mechanics</h4>
//               <p className="text-muted">
//                 Certified mechanics with years of experience
//               </p>
//             </Col>
//             <Col md={4} className="text-center mb-4">
//               <div className="feature-icon mb-3">
//                 <i className="bi bi-clock display-4 text-primary"></i>
//               </div>
//               <h4>Flexible Scheduling</h4>
//               <p className="text-muted">
//                 Book services at your convenient time
//               </p>
//             </Col>
//             <Col md={4} className="text-center mb-4">
//               <div className="feature-icon mb-3">
//                 <i className="bi bi-shield-check display-4 text-primary"></i>
//               </div>
//               <h4>Quality Assurance</h4>
//               <p className="text-muted">
//                 100% satisfaction guarantee on all services
//               </p>
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       {/* Footer */}
//       <footer className="bg-dark text-white py-4">
//         <Container>
//           <Row>
//             <Col md={6}>
//               <h5>Vehicle Service System</h5>
//               <p className="mb-0">
//                 © 2024 Vehicle Service Booking System. All rights reserved.
//               </p>
//             </Col>
//             <Col md={6} className="text-md-end">
//               <Link to="/contact" className="text-white me-3 text-decoration-none">
//                 Contact Us
//               </Link>
//               <Link to="/privacy" className="text-white me-3 text-decoration-none">
//                 Privacy Policy
//               </Link>
//               <Link to="/terms" className="text-white text-decoration-none">
//                 Terms of Service
//               </Link>
//             </Col>
//           </Row>
//         </Container>
//       </footer>
//     </>
//   );
// };

// export default Home;



// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { serviceService } from "../services/api";
// import { useAuth } from "../context/AuthContext";
// import CustomNavbar from "../components/Navbar";
// import vsbHomeImg from "../assets/img/vsb-home-img.jpeg";

// const Home = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { isAuthenticated, user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const res = await serviceService.getAllServices();
//       setServices(res.data.slice(0, 6));
//     } catch (err) {
//       setError("Failed to load services");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBookService = (serviceId) => {
//     if (!isAuthenticated()) {
//       navigate("/login");
//     } else if (user?.role !== "CUSTOMER") {
//       alert("Only customers can book services");
//     } else {
//       navigate(`/booking/${serviceId}`);
//     }
//   };

//   return (
//     <>
//       <CustomNavbar />

//       {/* ================= HERO SECTION ================= */}
//       <section
//         className="hero-section py-5"
//         style={{
//           backgroundImage: `linear-gradient(to right, rgba(0,0,0,.85), rgba(0,0,0,.3)), url(${vsbHomeImg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           minHeight: "93.2vh",
//           display: "flex",
//           alignItems: "center",
//           color: "#fff",
//         }}
//       >
//         <Container>
//           <Row>
//             <Col lg={6}>
//               <h1 className="display-4 fw-bold mb-4">
//                 Professional Vehicle Service
//               </h1>
//               <p className="lead mb-4">
//                 Book expert mechanics with transparent pricing
//                 and trusted service.
//               </p>

//               {!isAuthenticated() ? (
//                 <>
//                   <Button as={Link} to="/register" size="lg" className="me-3">
//                     Get Started
//                   </Button>
//                   <Button as={Link} to="/login" variant="outline-light" size="lg">
//                     Login
//                   </Button>
//                 </>
//               ) : (
//                 <Button
//                   as={Link}
//                   to={
//                     user?.role === "CUSTOMER"
//                       ? "/customer"
//                       : user?.role === "MECHANIC"
//                       ? "/mechanic"
//                       : "/admin"
//                   }
//                   size="lg"
//                 >
//                   Go to Dashboard
//                 </Button>
//               )}
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       {/* ================= SERVICES SECTION ================= */}
//       <section className="py-5 bg-light">
//         <Container>
//           <div className="text-center mb-5">
//             <h2 className="fw-bold">Our Services</h2>
//             <p className="text-muted">
//               Choose from our wide range of vehicle services
//             </p>
//           </div>

//           {loading ? (
//             <div className="text-center">
//               <div className="spinner-border text-primary" />
//             </div>
//           ) : error ? (
//             <Alert variant="danger">{error}</Alert>
//           ) : (
//             <Row>
//               {services.map((service) => (
//                 <Col md={4} className="mb-4" key={service.id}>
//                   {/* ===== CARD STYLE FROM COMMENTED CODE ===== */}
//                   <Card className="h-100 shadow-sm">
//                     <Card.Body className="d-flex flex-column">
//                       <h5 className="fw-bold">{service.name}</h5>
//                       <p className="text-muted flex-grow-1">
//                         {service.description}
//                       </p>

//                       <div className="d-flex justify-content-between align-items-center mt-3">
//                         <strong className="text-primary fs-5">
//                           ₹{service.basePrice}
//                         </strong>

//                         {/* Hide for ADMIN & MECHANIC */}
//                         {user?.role !== "ADMIN" &&
//                           user?.role !== "MECHANIC" && (
//                             <Button
//                               variant="primary"
//                               onClick={() => handleBookService(service.id)}
//                             >
//                               Book Now
//                             </Button>
//                           )}
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           )}

//           <div className="text-center mt-4">
//             <Button as={Link} to="/services" variant="outline-primary">
//               View All Services
//             </Button>
//           </div>
//         </Container>
//       </section>

//       {/* ================= WHY CHOOSE US ================= */}
//       <section className="py-5">
//         <Container>
//           <Row className="text-center">
//             <Col md={4}>
//               <i className="bi bi-tools display-4 text-primary"></i>
//               <h5 className="mt-3">Expert Mechanics</h5>
//               <p className="text-muted">Certified & experienced professionals</p>
//             </Col>
//             <Col md={4}>
//               <i className="bi bi-clock display-4 text-primary"></i>
//               <h5 className="mt-3">Flexible Scheduling</h5>
//               <p className="text-muted">Book at your convenience</p>
//             </Col>
//             <Col md={4}>
//               <i className="bi bi-shield-check display-4 text-primary"></i>
//               <h5 className="mt-3">Trusted Service</h5>
//               <p className="text-muted">Quality assured work</p>
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       {/* ================= FOOTER ================= */}
//       <footer className="bg-dark text-white py-4">
//         <Container>
//           <Row>
//             <Col md={6}>
//               <h5>Vehicle Service Booking System</h5>
//               <p className="mb-0">
//                 © 2026 Vehicle Service System
//               </p>
//             </Col>
//             <Col md={6} className="text-md-end">
//               <Link to="/contact" className="text-white me-3">
//                 Contact
//               </Link>
//               <Link to="/privacy" className="text-white me-3">
//                 Privacy
//               </Link>
//               <Link to="/terms" className="text-white">
//                 Terms
//               </Link>
//             </Col>
//           </Row>
//         </Container>
//       </footer>
//     </>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { serviceService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import CustomNavbar from "../components/Navbar";
import "./Home.css";

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await serviceService.getAllServices();
      setServices(res.data.slice(0, 6));
    } catch {
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const handleBookService = (id) => {
    if (!isAuthenticated()) navigate("/login");
    else if (user?.role !== "CUSTOMER")
      alert("Only customers can book services");
    else navigate(`/booking/${id}`);
  };

  return (
    <>
      <CustomNavbar />

      {/* 🔥 FULL PAGE BACKGROUND */}
      <div className="page-bg">

        {/* ================= HERO ================= */}
        <section className="hero">
          <Container>
            <Row>
              <Col lg={6}>
                <h1 className="display-4 fw-bold mb-4">
                  Professional Vehicle Service
                </h1>
                <p className="lead mb-5">
                  Book expert mechanics with transparent pricing and trusted service.
                </p>

                {!isAuthenticated() ? (
                  <>
                    <Button as={Link} to="/register" size="lg" className="me-3">
                      Get Started
                    </Button>
                    <Button
                      as={Link}
                      to="/login"
                      variant="outline-light"
                      size="lg"
                    >
                      Login
                    </Button>
                  </>
                ) : (
                  <Button
                    as={Link}
                    to={
                      user?.role === "CUSTOMER"
                        ? "/customer"
                        : user?.role === "MECHANIC"
                        ? "/mechanic"
                        : "/admin"
                    }
                    size="lg"
                  >
                    Go to Dashboard
                  </Button>
                )}
              </Col>
            </Row>
          </Container>
        </section>


        {/* ================= QUICK LOGIN ================= */}
{!isAuthenticated() && (
  <section className="py-5">
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="bg-dark text-white shadow-lg">
            <Card.Body className="p-5 text-center">
              <h3 className="fw-bold mb-3">Quick Login</h3>
              <p className="opacity-75 mb-4">
                Login to book services and manage your dashboard
              </p>

              <Button
                as={Link}
                to="/login"
                size="lg"
                className="px-5"
              >
                Login Now
              </Button>

              <p className="mt-3 opacity-75">
                Don’t have an account?{" "}
                <Link to="/register" className="text-white fw-bold">
                  Register
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
)}


        {/* ================= SERVICES ================= */}
        <section className="services">
          <Container>
            <div className="text-center text-white mb-5">
              <h2 className="fw-bold">Our Services</h2>
              <p className="opacity-75">
                Choose from our wide range of vehicle services
              </p>
            </div>

            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-light" />
              </div>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <Row className="g-4">
                {services.map((service) => (
                  <Col md={4} key={service.id}>
                  
                    <div className="service-card">
  <div className="d-flex justify-content-between align-items-center mb-2">
    <h5 className="fw-bold mb-0">{service.name}</h5>
    <span
      className={`badge ${
        service.requiredSkill === "ADVANCED"
          ? "bg-danger"
          : service.requiredSkill === "INTERMEDIATE"
          ? "bg-warning"
          : "bg-success"
      }`}
    >
      {service.requiredSkill}
    </span>
  </div>

  <p className="text-muted">{service.description}</p>

  <div className="d-flex justify-content-between align-items-center mt-4">
    <strong className="fs-5 text-primary">
      ₹{service.basePrice}
    </strong>

    {user?.role !== "ADMIN" && user?.role !== "MECHANIC" && (
      <Button onClick={() => handleBookService(service.id)}>
        Book Now
      </Button>
    )}
  </div>
</div>

                  </Col>
                ))}
              </Row>
            )}

            <div className="text-center mt-5">
              <Button as={Link} to="/services" variant="outline-light">
                View All Services
              </Button>
            </div>
          </Container>
        </section>

        {/* ================= WHY CHOOSE US ================= */}
        <section className="py-5">
          <Container>
            <Row className="text-center text-white">
              <Col md={4}>
                <i className="bi bi-tools display-4 mb-3"></i>
                <h5>Expert Mechanics</h5>
                <p className="opacity-75">
                  Certified & experienced professionals
                </p>
              </Col>
              <Col md={4}>
                <i className="bi bi-clock display-4 mb-3"></i>
                <h5>Flexible Scheduling</h5>
                <p className="opacity-75">
                  Book services at your convenience
                </p>
              </Col>
              <Col md={4}>
                <i className="bi bi-shield-check display-4 mb-3"></i>
                <h5>Trusted Service</h5>
                <p className="opacity-75">
                  Quality assured & transparent pricing
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ================= FOOTER ================= */}
        {/* <footer className="py-4">
          <Container>
            <Row className="text-white">
              <Col md={6}>
                <h5>Vehicle Service Booking System</h5>
                <p className="mb-0 opacity-75">
                  © 2026 Vehicle Service System
                </p>
              </Col>
              <Col md={6} className="text-md-end">
                <Link to="/contact" className="text-white me-3">
                  Contact
                </Link>
                <Link to="/privacy" className="text-white me-3">
                  Privacy
                </Link>
                <Link to="/terms" className="text-white">
                  Terms
                </Link>
              </Col>
            </Row>
          </Container>
        </footer> */}

        <footer className="py-4">
  <Container>
    <Row className="text-white">

 {/* LEFT: SYSTEM INFO + ADDRESS */}
<Col md={6}>
  <h5>📍 Vehicle Service Showroom</h5>

  <p className="mb-1 opacity-75">
    Ground Floor, Orion Auto Plaza,<br />
    Ring Road, Near City Mall,<br />
    Baner, Pune – 411045,<br />
    Maharashtra, India
  </p>

 
  <p className="mb-1 opacity-75">
  📞 +91 98765 43210 <br />
  🕘 Mon–Sat: 9:00 AM – 7:00 PM
</p>
 <p className="mb-0 opacity-75 ">
    © 2026 Vehicle Service System
  </p>
</Col>


      {/* RIGHT: LINKS */}
      <Col md={6} className="text-md-end">
        <Link to="/contact" className="text-white me-3">
          Contact
        </Link>
        <Link to="/privacy" className="text-white me-3">
          Privacy
        </Link>
        <Link to="/terms" className="text-white">
          Terms
        </Link>
      </Col>

    </Row>
  </Container>
</footer>


      </div>
    </>
  );
};

export default Home;
