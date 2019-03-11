const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/user.js');
const postRoutes = require('./routes/posts.js');
const cityRoutes = require('./routes/cities.js');
const userPostRoutes = require('./routes/userPosts.js');
const db = require('./models');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/user', userRoutes);
app.use('/posts', postRoutes);
app.use('/cities', cityRoutes);
app.use('/userposts', userPostRoutes);

app.use(express.static('public'));

// CRUD FOR USERS
// [] ONLY FOR ADMIN, THIS WILL CONFLICT WITH "SHOW" METHOD IN USERCONTROLLER
// get all users
app.get('/api/users', (req, res) => {
  db.Users.find({}, (error, users) => {
    res.json(users);
  });
});


app.listen(process.env.PORT || 3001, () =>
  console.log('Listening on port 3001 :)')
);
