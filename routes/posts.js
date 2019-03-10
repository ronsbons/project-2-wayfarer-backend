const 
  express = require('express'),
  router = express.Router(),
  controllers = require('../controllers');

// route to show posts by city
router.get('/:id', controllers.post.show);
router.post('/', controllers.post.create);

module.exports = router;