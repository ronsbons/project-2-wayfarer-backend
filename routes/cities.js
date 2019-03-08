const 
  express = require('express'),
  router = express.Router(),
  controllers = require('../controllers');

router.get('/', controllers.city.show);

module.exports = router;