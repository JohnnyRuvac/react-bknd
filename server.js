const express = require('express');

const app = express();

app.listen(3000, () => {
  console.log('listening on 3000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/assets/app.bundle.js', (req, res) => {
  res.sendFile(__dirname + '/dist/assets/app.bundle.js');
});