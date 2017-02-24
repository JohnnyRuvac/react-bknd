import express from 'express';


const apiRoute = (jwtCheck, db) => {

  const router = express.Router();

  // read doesn't require auth
  router
    .get('/:type', (req, res) => {
      var cursor = db.collection(req.params.type).find().sort({index: 1}).toArray( (err, results) => {
        res.json(results);
      });
    })
    .get('/:type/:slug', (req, res) => {
      const cursor = db.collection(req.params.type).find({slug: req.params.slug}).toArray( (err, result) => {
        if (err) return console.log(err);
        res.json(result[0]);
      });
    });

  // but post, patch & delete do
  router
    .route('/:type/:slug')
    // create
    .post(jwtCheck, (req, res) => {
      
      // get new item's index, it will be added as last item 
      db.collection(req.params.type).find().toArray( (err, result) => {
        
        const index = result.length;
        console.log('index: ' + index);
        req.body.index = index;
        console.log(req.body);
        db.collection(req.params.type).save(
          req.body
        );
        res.send('saved');

      });
    })
    // update
    .patch(jwtCheck, (req, res) => {

      db.collection(req.params.type).update(
        {slug: req.params.slug},
        {$set: req.body}
      );
      res.send('saved');

    })
    // delete
    .delete(jwtCheck, (req, res) => {
      
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
