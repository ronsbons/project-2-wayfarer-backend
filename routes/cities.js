const 
  express = require('express'),
  router = express.Router(),
  controllers = require('../controllers');

router.get('/', controllers.city.show);
router.get('/:id', controllers.city.showOneCity);
router.post('/', controllers.city.create);
router.put('/:id', controllers.city.update);
router.delete('/:id', controllers.city.delete);

module.exports = router;