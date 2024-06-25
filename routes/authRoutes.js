const express = require('express');
const router = express.Router();
const { signInWithEmailAndPassword } = require('firebase/auth');
const auth = require('../config/firebaseConfig'); // Adjust path as per your project structure

// POST /api/login - Handle login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Received login request:', { email, password });

  try {
    console.log('Attempting to sign in with email:', email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('Login successful for user:', user.email);
    res.json({ message: 'Login successful!', user });
  } catch (error) {
    console.error('Error during login:', error);

    if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
      res.status(401).json({ error: 'Invalid email or password' });
    } else {
      res.status(500).json({ error: 'Login failed. Please try again later.' });
    }
  }
});

module.exports = router;