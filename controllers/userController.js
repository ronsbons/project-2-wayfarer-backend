const
  bcrypt = require('bcrypt'),
  db = require ('../models'),
  jwt = require('jsonwebtoken');

module.exports = {
  signup: (request, response) => {
    console.log('sign up request:', request.body);
    console.log('sign up');
    // check to see if email is already in db
    db.Users.find({userEmail: request.body.email}).exec().then( (user) => {
      // if a user is found in db with that email
      if (user.length >= 1) {
        // [] RESPONSE MESSAGE HERE DOESN'T SHOW UP IN CONSOLE
        return response.status(409).json({
          message: 'Email address already exists'
        })
      // if a user is not found
      } else {
        // bcrypt hash the plaintext password the user entered to a complexity of 10
        bcrypt.hash(request.body.password, 10, (error, hash) => {
          if (error) {
            console.log('hashing error:', error);
            response.status(200).json({error: error});
          // if no error, we have a hashed password to use
          } else {
            // now create the user in the database
            db.Users.create({
              // .username should match what's in the name="" in the <form><input>
              userEmail: request.body.email,
              userPassword: hash,
            }, (error, newUser) => {
              console.log('here is the new user: ', newUser);
              if (error) {
                return response.status(500).json({error})
              };
              // putting new user data into a variable to create token with, so don't need all properties that are in user schema
              let user = {
                email: newUser.userEmail,
                _id: newUser._id,
              };
              console.log(user);
              // create jwt token
              // user is the payload, 'baybridge' is the secret key, and {options}
              jwt.sign(user, 'baybridge', {expiresIn: '1h'}, (error, signedJwt) => {
                if (error) {
                  console.log('signup jwt sign error: ', error);
                };
                response.status(200).json({
                  message: 'User created',
                  user,
                  signedJwt
                });
              });
            }); // end of db.Users.create method
          }; // end of if/else statement in bcrypt.hash
        }); // end of bcrypt.hash
      }; // end of i/else statement in db.Users.find
    // end of db.Users.find.then method
    }).catch( (error) => {
      console.log('signup db.Users.find.catch: ', error);
      response.status(500).json({error})
    });
  },

  login: (request, response) => {
    console.log('login');
    console.log('login request:', request.body);
    // .select('+userPassword') brings password back from the database and includes it in order to match it against the user input from the form
    db.Users.find({userEmail: request.body.email}).select('+userPassword').exec().then( (users) => {
      console.log('users: ', users);
      // if no users are found,
      if (users.length < 1) {
        return response.status(401).json({
          message: 'Email/Password incorrect',
        });
      };
      // if a user's email is found,
      console.log('login request body: ', request.body);
      // this is the hashed password for that user in the database
      console.log('login password hash: ', users[0].userPassword);
      // bcrypt hashes the req.body.password in order to compare it to the hashed password in the database
      bcrypt.compare(request.body.password, users[0].userPassword, (error, match) => {
        if (error) {
          console.log('login bcrypt compare: ', error);
          return response.status(500).json({error});
        };
        // if user inputted password matches hashed password in database,
        if (match) {
          console.log('match: ', match);
          // response.json(users[0]);
          // create a json web token
          let user = {
            userFullName: users[0].userFullName,
            userEmail: users[0].userEmail,
            userCity: users[0].userCity,
            userJoinDate: users[0].userJoinDate,
            _id: users[0]._id,
          };
          console.log(user);
          jwt.sign(user, 'baybridge', {expiresIn: '1h'}, (error, signedJwt) => {
            if (error) {
              console.log('login jwt sign error: ', error);
            }
            response.status(200).json({
              message: 'Login auth successful',
              user,
              signedJwt,
            });
          });
        // if user inputted password does not match hashed password in database,
        } else {
          console.log('not a match');
          response.status(401).json({
            message: 'Email/Password incorrect',
          });
        }; // end of if/else statemnt in bcrypt.compare
      }); // end of bcrypt.compare method
    // end of db.Users.find.then method
    }).catch( (error) => {
      console.log('login db.users.find.catch: ', error);
      response.status(500).json({error});
    });
  },

  show: (request, response) => {
    console.log('show');
    // request.userId from user route
    console.log(request.userId);
    // if there's a value to request.userId,
    if (request.userId) {
      // find the user in the database using the userId
      // [] WHY DON'T WE HAVE TO DO .EXEC().THEN FOR THIS FUNCTION?
      db.Users.findById(request.userId, (error, foundUser) => {
        if (error) {
          console.log('show db.Users.findbyid: ', error);
        };
        // return the database result
        response.json(foundUser);
      });
    } else {
      response.json('No user Id provided');
    };
  },
};