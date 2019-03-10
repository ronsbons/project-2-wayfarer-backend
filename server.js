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


// CRUD FOR POSTS
// get all posts, regardless of by city or by user
// ONLY FOR ADMIN
app.get('/api/posts', (req, res) => {
  db.Posts.find({})
    .populate('user')
    // .populate('city')
    .exec((error, posts) => {
      res.json(posts);
    });
});

app.put('/api/posts/:id', (req, res) => {
  console.log('update post', req.params);
  console.log(`the body is`, req.body);
  const postId = req.params.id;
  db.Posts.findOneAndUpdate(
    { _id: postId },
    req.body,
    { new: true },
    (err, updatePosts) => {
      if (err) {
        throw err;
      }
      res.json(updatePosts);
    }
  );
});

app.delete('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  console.log('delete post', postId);
  db.Posts.findOneAndDelete({ _id: postId }, (err, deletedPost) => {
    if (err) {
      throw err;
    }
    res.json(deletedPost);
  });
});


app.listen(process.env.PORT || 3001, () =>
  console.log('Listening on port 3001 :)')
);
