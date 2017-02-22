import express from 'express';
import fs from 'fs';
import path from 'path';;


const deleteUploadRoute = (jwtCheck) => {
  
  const router = express.Router();

  router
    .route('/:file')
    .delete(jwtCheck, (req, res) => {
      const url = path.resolve(process.cwd(), 'dist', 'uploads', req.params.file);

      fs.stat(url, (err, stat) => {
        if (!err) {
          fs.unlink(url);
        }
      });
      
      res.send(req.params.file);
    });

  return router;

}

export default deleteUploadRoute;