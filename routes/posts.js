const 
  express = require('express'),
  router = express.Router(),
  controllers = require('../controllers');

// route to show posts by city
router.get('/:id', controllers.post.show);
// create a post
router.post('/', controllers.post.create);
// admin route
router.get('/', controllers.post.showAllPosts);

module.exports = router;