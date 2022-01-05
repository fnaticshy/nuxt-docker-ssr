const express = require('express');
const axios = require('axios');
const {connectDb} = require('./helpers/db');
const {port, host, db, apiUrl} = require('./configuration/');
const {response} = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.send('AUTH WORKING!')
});

app.get('/testwithapidata', (req, res) => {
  axios(apiUrl + '/testapidata')
    .then(response => {
      res.json({
        'testapidata': response.data.testapidata
      })
    })
});

app.get('/api/currentUser', (req, res) => {
  res.json({
    id: "1234",
    email: "test@test.com"
  })
});

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer)

function startServer() {
  app.listen(port, () => {
    console.log('=== AUTH STARTED ON PORT: ' + port + ' ===');
    console.log('=== HOST: ' + host + ' ===');
    console.log('=== DATABASE: ' + db + ' ===');
  });
}
