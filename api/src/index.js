const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const {connectDb} = require('./helpers/db');
const {port, host, db, authApiUrl} = require('./configuration/');
const {response} = require('express');
const app = express();
const postSchema =  new mongoose.Schema({
  name: String
})
const Post = mongoose.model('Post', postSchema);
const silence = new Post({ name: 'Silence'});

app.get('/test', (req, res) => {
  res.send('API WORKING!')
});

app.get('/api/testapidata', (req, res) => {
  res.json({
    'testapidata': true
  })
});

app.get('/testwithcurrentuser', (req, res) => {
  axios.get(authApiUrl + '/currentUser')
    .then(response => {
      res.json({
        'testwithcurrentuser': true,
        data: response.data
      })
    })
});

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer)

function startServer() {
  app.listen(port, () => {
    console.log('=== API STARTED ON PORT: ' + port + ' ===');
    console.log('=== HOST: ' + host + ' ===');
    console.log('=== DATABASE: ' + db + ' ===');
    
    silence.save(function (err, savedElement) {
      if (err) return console.error(err)
      console.log('savedElement with volume!!!!', savedElement);
    })
  });
}
