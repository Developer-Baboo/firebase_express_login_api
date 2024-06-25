const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require('notification-c7ebd-firebase-adminsdk-tm3xn-fb58266fcd.json'); // Update the path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

module.exports = admin;