import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';


const checkFolder = (folderPath) => {
  fs.stat(folderPath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.mkdir(folderPath);
      } else {
        console.log('error:');
        console.log(err);
      }
    }
  });
}

// make sure that upload folder exists
const uploadPath = path.resolve(__dirname, '../../dist/uploads');
checkFolder(uploadPath);

const getUniqueFilename = (originalName, tryName, attemptIndex, cb) => {
  const url = path.resolve(uploadPath, tryName);
  fs.stat(url, (err, stats) => {
    if (err && err.code === 'ENOENT') {
      // console.log('got unique: ' + tryName);
      cb(null, tryName);
    } else {

      const split = originalName.split('.');
      const extension = split.pop();
      const testName = split.join('.') + '_' + attemptIndex + '.' + extension;

      // console.log('trying alternative: ' + testName);
      getUniqueFilename(originalName, testName, ++attemptIndex, cb);

    }
  });
  
};

// define storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const newPath = path.resolve(uploadPath, req.params.folder);
    checkFolder(newPath);
    cb(null, newPath);
  },
  filename: (req, file, cb) => {
    // get unique and call back
    getUniqueFilename(file.originalname, file.originalname, 1, cb);
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
    .route('/:folder')
    .post(jwtCheck, (req, res) => {
      upload(req, res, (err) => {
        if (err) {
          res.statusCode = 400;
          return res.json({errors: ['File failed to upload']});
        }
        // console.log(req.file.filename);
        res.send(req.file.filename);
      });
    });

  return router;

}

export default uploadRoute;