const 
  express = require('express'),
  router = express.Router(),
  controllers = require('../controllers');

router.get('/', controllers.citiesController.FUNCTION_NAME);

module.exports = router;