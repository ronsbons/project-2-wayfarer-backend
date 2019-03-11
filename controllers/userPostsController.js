const db = require('../models');

module.exports = {
  show: (request, response) => {
    db.Users.findOne({ _id: request.params.id }).exec((err, foundUser) => {
      if (err) {
        console.log(`can't find user error:`, err);
      }
      console.log(`Found User ${foundUser}`);
      db.Posts.find({ user: foundUser._id }, (err, foundPosts) => {
        if (err) {
          console.log(`can't find posts of user ${err}`);
        }
        response.json(foundPosts);
        console.log(foundPosts);
      });
    });
  },

  update: (request, response) => {
    console.log('update post', request.params);
    console.log(`the body is`, request.body);
    const postId = request.params.id;
    db.Posts.findOneAndUpdate(
      { _id: postId },
      request.body,
      { new: true },
      (err, updatePosts) => {
        if (err) {
          console.log(`update post error: ${err}`);
        }
        response.json(updatePosts);
        console.log(`updated post: ${updatePosts}`);
      }
    );
  },

  delete: (request, response) => {
    const postId = request.params.id;
    console.log('delete post', postId);
    db.Posts.findOneAndDelete({ _id: postId }, (err, deletedPost) => {
      if (err) {
        console.log(`can't find post to delete: ${err}`);
      }
      response.json(deletedPost);
      console.log(`deleted post: ${deletedPost}`);
    });
  }
}