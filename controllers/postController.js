const db = require ('../models');

module.exports = {
  show: (request, response) => {
    db.Cities.findOne({ _id: request.params.id }).exec( (err, foundCity) => {
      if (err) {
        console.log(`can't find city error: `, err);
      }
      console.log(`Found City ${foundCity}`);
      db.Posts.find({ city: foundCity._id }, (err, foundPosts) => {
        if (err) {
          console.log(`can't find posts of city: `, err);
        };
        console.log(foundPosts);
        response.json(foundPosts);
      });
    });
  },

  create: (request, response) => {
    // find user by id to tie to created post
    db.Users.findOne({ _id: request.body.user }).exec((err, foundUser) => {
      if (err) {
        console.log(`can't find user when creating post: `, err);
      }
      // then find city by id to tie to created post
      db.Cities.findOne({ _id: request.body.city }).exec((err, foundCity) => {
        if (err) {
          console.log(`can't find city when creating post: `, err);
        }
        var newPost = new db.Posts({
          postTitle: request.body.postTitle,
          postContent: request.body.postContent,
          postDate: Date(), //request.body.postDate,
          user: foundUser,
          city: foundCity
        });
        console.log(`created post ${newPost}`);
        newPost.save((error, savedPost) => {
          if (error) {
            console.log(`save new post error: ${error}`);
            response.send(error.message);
          } else {
            response.json(savedPost);
            console.log(`this is the saved new post: ${savedPost}`);
          }
        });
      });
    });
  },

  showAllPosts: (request, response) => {
    db.Posts.find({})
    .populate('user')
    .populate('city')
    .exec((error, posts) => {
      if (error) {
        console.log(`can't find all posts: ${error}`);
      }
      response.json(posts);
      console.log(`all posts: ${posts}`);
    });
  }
};