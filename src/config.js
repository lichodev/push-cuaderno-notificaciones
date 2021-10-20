var admin = require('firebase-admin');
var serviceAccount = require("./credentials.json");

firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cuaderno-comunicaciones-default-rtdb.firebaseio.com"
});

const db = admin.database();
const messages = admin.messaging();

module.exports = { db, messages };