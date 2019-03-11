const 
  express = require('express'),
  router = express.Router(),
  controllers = require('../controllers');

// show posts by user
router.get('/:id', controllers.userPosts.show);
// edit a post
router.post('/:id', controllers.userPosts.update);
// delete a post
router.delete('/:id', controllers.userPosts.delete);

module.exports = router;