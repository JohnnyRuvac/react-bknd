import express from 'express';


const apiRoute = (jwtCheck, db) => {

  const router = express.Router();

  // read doesn't require auth
  router
    .get('/:type', (req, res) => {
      db.collection(req.params.type)
        .find()
        .sort({index: 1})
        .toArray( (err, results) => {
          res.json(results);
        });
    })
    .get('/items/single/:slug', (req, res) => {
      db
        .collection('items')
        .find({slug: req.params.slug})
        .toArray( (err, result) => {
          if (err) return console.log(err);
          res.json(result);
        })
    })
    .get('/:type/:slug', (req, res) => {
      // items slug is exception, it can return multiple results of items belonging to category,
      // therefore we have to search for categorySlug instead of slug and we have to sort it by index
      if (req.params.type === 'items') {
        
        db.collection(req.params.type)
          .find({
            categorySlug: {
              $in: [req.params.slug]
            }
          })
          .sort({index: 1})
          .toArray( (err, result) => {
            if (err) return console.log(err);
            res.json(result);
          });

      } else {

        db.collection(req.params.type)
          .find({slug: req.params.slug})
          .toArray( (err, result) => {
            if (err) return console.log(err);
            res.json(result);
          });        

      }
    });

  // but post, patch & delete do
  router
    .route('/:type/:slug')
    // create
    .post(jwtCheck, (req, res) => {
      
      // get new item's index, it will be added as last item 
      db.collection(req.params.type).find().toArray( (err, result) => {
        
        const index = result.length;
        req.body.index = index;
        db.collection(req.params.type).save(
          req.body
        );
        res.send('saved');

      });
    })
    // update
    .patch(jwtCheck, (req, res) => {

      // categories need to update it's children categorySlug after renamting it
      if (req.params.type === 'categories') {
        db.collection('items')
          .update(
            {categorySlug: req.params.slug},
            {$set: {categorySlug: req.body.slug}},
            {multi: true},
          );
      }

      // update data in db
      db.collection(req.params.type).update(
        {slug: req.params.slug},
        {$set: req.body}
      );
      res.send('saved');

    })
    // delete
    .delete(jwtCheck, (req, res) => {

      // after deleting category, move it's children to _uncategorized
      if (req.params.type === 'categories') {
        db.collection('items')
          .update(
            {categorySlug: req.params.slug},
            {$set: {categorySlug: '_uncategorized'}},
            {multi: true},
          );
      }
      
      db.collection(req.params.type).remove({slug: req.params.slug}, {justOne: true})
        .then(result => {
          res.send('saved');
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        });

    });

  return router;

}

export default apiRoute;
