import express from 'express';


const deleteUploadRoute = (jwtCheck, db) => {
  
  const router = express.Router();

  router
    .route('/removeFromCategory/:categorySlug/:itemSlug')
    .patch(jwtCheck, (req, res) => {

      db.collection('items')
        .update({
          slug: req.params.itemSlug,
          $where : 'this.categorySlug.length > 1',
        },
        {
          $pull: {
            categorySlug: req.params.categorySlug,
          }
        });

      db.collection('items')
        .update({
          slug: req.params.itemSlug,
          $where : 'this.categorySlug.length < 2',
        },
        {
          $set: {
            categorySlug: ['_uncategorized'],
          }
        });

      res.json({
        slug: req.params.itemSlug,
      });

    });

  return router;

}

export default deleteUploadRoute;
