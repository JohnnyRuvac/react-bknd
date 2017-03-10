import express from 'express';
import fs from 'fs';
import path from 'path';;


const deleteUploadRoute = (jwtCheck) => {
  
  const router = express.Router();

  router
    .route('/:folder/:file')
    .delete(jwtCheck, (req, res) => {
      let url;

      if (req.params.folder !== 'undefined') {
        url = path.resolve(process.cwd(), 'dist', 'uploads', req.params.folder, req.params.file);
      } else {
        url = path.resolve(process.cwd(), 'dist', 'uploads', req.params.file);
      }

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