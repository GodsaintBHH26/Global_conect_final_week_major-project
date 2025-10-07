       Global Connect - Professional Networking Platform

Project Overview

Global Connect is a responsive, MERN stack social networking application designed to connect professionals, facilitate job discovery, and enable real-time communication, mimicking the core functionality and user experience of platforms like LinkedIn.

1. Project Details


Project Type

MERN Stack (MongoDB, Express, React, Node)

Status

MVP - UI and Core API Functionality Integrated



Live Deployment URL

[[PLACEHOLDER: Insert Vercel/Render Live URL]](https://global-conect-final-week-major-proj.vercel.app/)

Team Contribution
This project was developed collaboratively by Arijit, Akriti, Prasad, Nandinee, Rocky, and Ashish. All members contributed equally to the Frontend UI, Backend API development, and integration.

2. Technical Stack

Area - Frontend

Technology - React, React Router DOM

Purpose - SPA development, navigation, and state management.

Styling - Custom Plain CSS & CSS Variables

Ensured cross-component consistency and custom branding.

Forms - react-hook-form

Advanced form validation (Login, Signup).

Backend - Node.js, Express.js

RESTful API creation, routing, and middleware.

Database - MongoDB (Atlas), Mongoose

Data persistence and ODM layer.

Auth/Security - JWT (JSON Web Tokens), bcrypt

Secure session management and password hashing.

3. Installation and Setup
To run the Global Connect application locally, you must set up both the client (frontend) and the server (backend).

Prerequisites
Node.js (Latest Stable Version)

npm (or yarn)

MongoDB Instance (Local or MongoDB Atlas)

Step 3.1: Backend (Server Setup)
Navigate to the server directory and install dependencies:

# 1. Navigate to the server folder
cd server

# 2. Install Node dependencies
npm install

# 3. Create a .env file and add your MongoDB URI:
# .env file content:
# MONGODB_URI=mongodb+srv://<user>:<password>@clustername/globalconnect
# JWT_SECRET=[PLACEHOLDER: Generate a strong secret key]

Run the Server:

npm run dev
# Server should start on port 3000 (http://localhost:3000)

Step 3.2: Frontend (Client Setup)
Open a new terminal tab/window, navigate to the client directory, and install dependencies:

# 1. Navigate to the client folder
cd client

# 2. Install React dependencies
npm install

# 3. Create a .env file to point to the API:
# .env file content:
# VITE_API_BASE_URL=http://localhost:3000/api

Run the Client:

npm run dev
# Client should start on a local port (e.g., http://localhost:5173)

4. Application Structure & Features
The application is fully integrated, combining all the following core modules:

Core UI Pages (Frontend)
Home Page (/): 3-Column sticky/scrolling feed with a functional Post Creation Modal.

Jobs Page (/jobs): 2-Column layout with stateful job filters.

My Network (/mynetwork): Fixed left sidebar and a connection suggestion grid.

Messaging (/messaging): 3-Column chat interface with real-time message simulation.

Notifications (/notifications): Centralized chronological feed.

Profile Page (/me): Integrated component structure for editing About, Experience, Education, and Skills data.

Authentication Flow
Login/Signup: Forms integrated with the MERN API via react-hook-form for secure user creation and session login.

Global State: Uses UserContext to maintain authentication status and provide user profile data to all components.

Website Link:- https://global-conect-final-week-major-proj.vercel.app/
