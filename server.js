const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongourl = '';
var db;

MongoClient.connect(mongourl, (err, database) => {
  if (err) return console.log(err);

  db = database;
  app.listen(3000, function(){
    console.log('listening on 3000');
  });

});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/assets/app.bundle.js', (req, res) => {
  res.sendFile(__dirname + '/dist/assets/app.bundle.js');
});


// Pages CRUD
app.get('/pages', (req, res) => {
  var cursor = db.collection('pages').find().toArray( (err, results) => {
    res.json(results);
  });
});

app.post('/pages/new', (req,res) => {
  db.collection('pages').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('page saved');
    res.send('page saved');
  });
});