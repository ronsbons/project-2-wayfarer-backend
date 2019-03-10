const 
  express = require('express'),
  router = express.Router(),
  controllers = require('../controllers'),
  jwt = require('jsonwebtoken');

router.post('/signup', controllers.user.signup);

router.post('/login', controllers.user.login);

// update user's profile
// [] IF USE THIS ROUTE, WILL HAVE TO UPDATE FRONT-END AXIOS CALL TO 'HEROKU.COM/USER/:ID', NOT 'HEROKU.COM/API/USERS/:ID'
// [] I THINK THIS IS MEANT TO GO AFTER THE ROUTER.USE, BUT IT ERRORS THERE, B/C THE REQUEST DOESN'T HAVE A BEARER HEADER
router.put('/:id', controllers.user.update);

// puts jwt token on request to show profile
// [] THIS ONLY RUNS WHEN THE PAGE REFRESHES/RELOADS
router.use((request, response, next) => {
  console.log('activating jwt middleware');
  // grabs 'authorization' part of the request header
  const bearerHeader = request.headers['authorization'];
  console.log('token check:', bearerHeader);

  // if there is a value in bearerHeader, then...
  if(typeof bearerHeader !== 'undefined') {
    // breaks up request header 'Bearer <token>' into separate parts
    const bearer = bearerHeader.split(' ');
    // stores token
    const bearerToken = bearer[1];
    // stores token in request
    request.token = bearerToken;
    // verifies token against secret key
    // if secret key is inside the signature part of the token, it will open the payload have access to request data
    // [] ERROR: VERIFIED IS NOT DEFINED
    console.log('request.token: ', request.token);
    let verified = jwt.verify(request.token, 'baybridge');
    console.log(verified);
    console.log('here is the verified: ', verified._id);
    // pulls out user id from token
    request.userId = verified._id;
    console.log(request.userId);
    next();
  }
  else {
    response.sendStatus(403);
  }
});

// show user's profile
router.get('/', controllers.user.show);

module.exports = router;