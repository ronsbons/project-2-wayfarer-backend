const 
  express = require('express'),
  router = express.Router(),
  controllers = require('../controllers');

// show posts by user
router.get('/:id', controllers.userPosts.show);

module.exports = router;