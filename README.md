AutoCare Assist – Vehicle Service Booking System

AutoCare Assist is a full-stack vehicle service booking web application that allows users to register, log in, and book vehicle servicing appointments online. The system provides secure authentication and efficient service management using modern web technologies.

🔥 Features

🔐 Secure User Authentication (JWT + BCrypt password hashing)

📅 Vehicle Service Booking Management

👤 Role-Based Access (User/Mechanic/Admin)

🌐 RESTful API Integration

⚡ Responsive UI built with React

☁ Cloud Deployment on AWS

🔄 CORS Handling for Frontend–Backend Communication

🏗 Architecture

The project follows a 3-Tier Architecture:

Presentation Layer – React.js frontend

Application Layer – ASP.NET Core Web API

Data Layer – MySQL database using Entity Framework Core

🛠 Tech Stack
Frontend

React.js

JavaScript

CSS

Backend

ASP.NET Core Web API

C#

Entity Framework Core

LINQ

JWT Authentication

Database

MySQL

Cloud & Deployment

AWS S3 (Static Hosting)

AWS CloudFront (CDN)

AWS Elastic Beanstalk (Backend Hosting)

AWS RDS (Database)

🔐 Authentication Flow

User logs in with email & password.

Backend verifies password using BCrypt.

JWT token is generated and returned.

Frontend stores token and sends it in Authorization header.

Backend validates token for protected endpoints.

🚀 Deployment

Frontend deployed on AWS S3 and served via CloudFront.

Backend deployed on AWS Elastic Beanstalk.

Database hosted on AWS RDS.

Environment variables managed for production configuration.

📚 What I Learned

Building REST APIs using ASP.NET Core

Implementing secure authentication with JWT

Using Entity Framework Core with Code-First approach

Handling CORS issues in cloud environments

Deploying full-stack applications on AWS

📸 Screenshots




🚀 How to Run the Project

1️⃣ Clone the Repository
git clone https://github.com/your-username/vehicle-service-booking.git

cd vehicle-service-booking

2️⃣ Install Dependencies
npm install

3️⃣ Run the Server
npm start

4️⃣ Open in Browser
http://localhost:3000
