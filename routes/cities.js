const 
  express = require('express'),
  router = express.Router(),
  controllers = require('../controllers');

router.get('/', controllers.city.show);
router.get('/:id', controllers.city.showOneCity);

module.exports = router;