const admin = require('firebase-admin');
const serviceAccount = require('./xendit-fcm-firebase-adminsdk-waq3g-abb413477f.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

module.exports.admin = admin