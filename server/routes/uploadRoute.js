import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';


// make sure that upload folder exists
const uploadPath = path.resolve(__dirname, '../../dist/uploads');

fs.stat(uploadPath, (err, stats) => {
  if (err) {
    if (err.code === 'ENOENT') {
      fs.mkdir(uploadPath);
    } else {
      console.log('error:');
      console.log(err);
    }
  }
});

// define storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const split = file.originalname.split('.');
    const extension = split.pop();
    const filename = split.join('.').replace(/\W+/g, '-').toLowerCase() + '-' + Date.now() + '.' + extension;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    files: 1,
    fileSize: 2 * 1024 * 1024
  }
}).single('photo');


const uploadRoute = (jwtCheck) => {
  
  const router = express.Router();

  router
    .route('/')
    .post(jwtCheck, (req, res) => {
      upload(req, res, (err) => {
        if (err) {
          res.statusCode = 400;
          return res.json({errors: ['File failed to upload']});
        }
        console.log(req.file.filename);
        res.send(req.file.filename);
      });
    });

  return router;

}

export default uploadRoute;