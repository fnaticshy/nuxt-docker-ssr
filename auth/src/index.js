const express = require('express');
const {connectDb} = require('./helpers/db');
const {port, host, db} = require('./configuration/');
const app = express();

app.get('/test', (req, res) => {
  res.send('AUTH WORKING!')
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
