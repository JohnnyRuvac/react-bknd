import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv-safe';
import path from 'path';
import jwt from 'express-jwt';
import uploadRoute from './routes/uploadRoute';
import apiRoute from './routes/apiRoute';



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


const initApp = (db) => {

  // init app
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // serve static files
  const staticPath = path.resolve(__dirname, '../dist');
  app.use(express.static( staticPath ));

  // routes
  app.use('/api', apiRoute(jwtCheck, db));
  app.use('/upload', uploadRoute(jwtCheck));

  // redirect all requests except api to index.html for client side routing
  app.get('*', (req, res) => {
    const filePath = path.resolve(__dirname, '../dist/index.html');
    res.sendFile(filePath);
  });

  // and listen
  const port = process.env.SERVER_PORT;
  
  app.listen(port, function(){
    console.log('listening on ' + port);
  });

}



// init db and start listening when ready
const mongoUrl = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_URL;

MongoClient.connect(mongoUrl, (err, database) => {
  if (err) return console.log(err);
  initApp(database);
});
