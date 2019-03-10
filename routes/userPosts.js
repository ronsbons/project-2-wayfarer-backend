const 
  express = require('express'),
  router = express.Router(),
  controllers = require('../controllers');

// route to show posts by city
router.get('/:id', controllers.userPosts.show);

module.exports = router;