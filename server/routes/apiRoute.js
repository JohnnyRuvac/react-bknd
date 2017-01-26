import express from 'express';


const apiRoute = (jwtCheck, db) => {

  const router = express.Router();

  // read doesn't require auth
  router
    .get('/:type', (req, res) => {
      var cursor = db.collection(req.params.type).find().toArray( (err, results) => {
        res.json(results);
      });
    })
    .get('/:type/:slug', (req, res) => {
      const cursor = db.collection(req.params.type).find({slug: req.params.slug}).toArray( (err, result) => {
        if (err) return console.log(err);
        res.json(result[0]);
      });
    });

  // but post&delete do
  router
    .route('/:type/:slug', jwtCheck)
    // create&update
    .post((req, res) => {
      
      db.collection(req.params.type).update(
        {slug: req.params.slug}, 
        {$set: req.body},
        {upsert: true}
      );

    })
    // delete
    .delete((req, res) => {
      
      db.collection(req.params.type).remove({slug: req.params.slug}, {justOne: true})
        .then(result => {
          res.send({});
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        });

    });

  return router;

}

export default apiRoute;
