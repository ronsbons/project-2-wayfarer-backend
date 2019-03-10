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
  }
};