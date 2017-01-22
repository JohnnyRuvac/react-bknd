import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv-safe';
import path from 'path';
import jwt from 'express-jwt';


// load ENVs from file
dotenv.load({
  path: path.resolve(__dirname, '../.env'),
  sample: path.resolve(__dirname, '../.env.sample')
});

// secure some paths with jwt auth
const jwtCheck = jwt({
  secret: process.env.AUTH0_SECRET,
  audience: process.env.AUTH0_CLIENT_ID
});


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const mongourl = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_URL;
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

// Create
const newPageUrl = '/pages/new'; 
app.use(newPageUrl, jwtCheck);

app.post(newPageUrl, (req,res) => {
  db.collection('pages').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('page saved');
    res.send('page saved');
  });
});

// Get
app.get('/pages/:slug', (req, res) => {
  const cursor = db.collection('pages').find({slug: req.params.slug}).toArray( (err, result) => {
    if (err) return console.log(err);
    res.json(result[0]);
  });
});

// Edit page
const editPageUrl = '/pages/:slug'; 
app.use(editPageUrl, jwtCheck);

app.post(editPageUrl, (req, res) => {
  db.collection('pages').update({slug: req.params.slug}, {$set: req.body});
});

// Delete page
const deletePageUrl = '/pages/delete/:slug';
app.use(deletePageUrl, jwtCheck);

app.delete(deletePageUrl, (req, res) => {
  db.collection('pages').remove({slug: req.params.slug}, {justOne: true})
    .then(result => {
      res.send({});
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});