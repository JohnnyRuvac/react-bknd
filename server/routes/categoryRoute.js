import express from 'express';


const deleteUploadRoute = (jwtCheck, db) => {
  
  const router = express.Router();

  router
    .route('/removeFromCategory/:categorySlug/:itemSlug')
    .patch(jwtCheck, (req, res) => {

      db.collection('items')
        .update({
          slug: req.params.itemSlug,
        },
        {
          $pull: {
            categorySlug: req.params.categorySlug,
          }
        });

      res.json({
        slug: req.params.itemSlug,
      });

    });

  return router;

}

export default deleteUploadRoute;