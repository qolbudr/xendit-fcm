const express = require('express')
const app = express()
const port = 3000
const { admin } = require('./src/firebase-config')

app.use(express.json());

const notification_options = {
  priority: "high",
  timeToLive: 60 * 60 * 24
};

app.post('/', (req, res) => {
  const  registrationToken = "cuqZFDyF2LXbe4-woM72Oy:APA91bH-yolkkZgWgjQQf1iCw9HJK-lJgAgZssWP7llvRi-jPq_a_ewKT5l413cOvvi1BfuM-hLjmAJFz5J2p3QSGxc8_tQmPtvfXr9G1FvJ-kLlDoj8UO8-GjBYRWACP06fpQ0aN3C7"
  let message = {};
  if(req.body.hasOwnProperty('data')) {
    message = {
      notification: {
        title: 'PEMBAYARAN E-WALLET',
        body : 'Pembayaran melalui e-wallet - ' + req.body.data.channel_code
      }
    };
  } else {
    message = {
      notification: {
        title: 'PEMBAYARAN BERHASIL DILAKUKAN',
        body : 'Pembayaran dilakukan oleh - ' + req.body.payer_email
      }
    };
  }

  const options =  notification_options
  
  admin.messaging().sendToDevice(registrationToken, message, options)
    .then( response => {
      res.status(200).send("Notification sent successfully")
    })
    .catch( error => {
        console.log(error);
    }
  );
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})