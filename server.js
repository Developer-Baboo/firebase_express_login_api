const express = require('express'); // Import Express.js framework
const admin = require('firebase-admin'); // Import Firebase Admin SDK
const bodyParser = require('body-parser'); // Import body-parser middleware for parsing JSON bodies
require('dotenv').config(); // Load environment variables from .env file

// Initialize Firebase Admin SDK with service account credentials
const serviceAccount = require('./config/notification-c7ebd-firebase-adminsdk-tm3xn-fb58266fcd.json'); // Update the path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const app = express(); // Create an Express application
const port = 3000; // Define the port number for the server

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/authRoutes'); // Import authRoutes module for handling authentication routes
app.use('/api', authRoutes); // Mount authRoutes under /api path prefix

// Start the Express server and listen on specified port
app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}/`); // Log server start-up message with URL
});