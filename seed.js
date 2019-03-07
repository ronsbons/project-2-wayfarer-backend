const db = require("./models");

const myPosts = [
  {
    postTitle: "San Francisco Trip Post",
    postContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    postDate: "2018-3-12",
    user: "5c804261bec0244d32b761c6",
    city: {
      cityName: "San Francisco",
      cityPhoto: "san_francisco.png"
    }
  },
  {
    postTitle: "London Trip Post",
    postContent: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    postDate: "2018-3-20",
    user: "5c804261bec0244d32b761c6",
    city: {
      cityName: "London",
      cityPhoto: "london.png"
    }
  }
];

db.Posts.deleteMany({}, (err, cities) => {
  console.log("removed posts");

  db.Posts.create(myPosts, (err, cities) => {
    if (err) {
      console.log(err);
    }
    console.log("created all posts");
    console.log(`created ${myPosts.length} posts`);
  });
});
