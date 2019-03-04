const 
  express = require('express'),
  router = express.Router(),
  controllers = require('../controllers');

router.get('/', controllers.userController.FUNCTION_NAME);

module.exports = router;