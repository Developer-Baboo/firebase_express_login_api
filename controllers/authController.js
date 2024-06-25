const { signInWithEmailAndPassword } = require('firebase/auth');
const auth = require('../config/firebaseConfig'); // Import the initialized Firebase Auth

// Function to verify email and password using Firebase Authentication
async function verifyPassword(email, password) {
  try {
    // Attempt to sign in user with provided email and password
    console.log('Attempting to sign in with email:', email); // Log email for debugging
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user.uid; // Return the UID of the signed-in user
  } catch (error) {
    // If sign-in fails, log the error and return null
    console.error('Error verifying password:', error); // Log error for debugging
    return null;
  }
}

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body

  try {
    const userUid = await verifyPassword(email, password); // Verify email and password

    if (userUid) {
      // If user UID is retrieved successfully, create a custom token using Firebase Admin SDK
      console.log('Creating custom token for UID:', userUid); // Log UID for debugging
      const token = await admin.auth().createCustomToken(userUid);
      res.json({ token }); // Send token as JSON response
    } else {
      // If email or password is invalid, send 401 Unauthorized response
      console.log('Invalid email or password.'); // Log invalid credentials for debugging
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    // If any unexpected error occurs, send 400 Bad Request response with error message
    console.error('Error during login:', error); // Log error for debugging
    res.status(400).json({ error: error.message });
  }
};
module.exports = router;