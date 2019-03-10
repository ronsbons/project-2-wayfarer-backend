const 
  express = require('express'),
  router = express.Router(),
  controllers = require('../controllers');

// get all cities
router.get('/', controllers.city.show);
// get one city
router.get('/:id', controllers.city.showOneCity);

// admin routes
// create a city
router.post('/', controllers.city.create);
// update a city
router.put('/:id', controllers.city.update);
// delete a city
router.delete('/:id', controllers.city.delete);

module.exports = router;