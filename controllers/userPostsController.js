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
}