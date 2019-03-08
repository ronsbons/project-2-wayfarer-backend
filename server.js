const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/user.js");
const db = require("./models");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/user", userRoutes);

app.use(express.static("public"));

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Wayfare's API! Here's what you need to know:",
    documentationUrl: "", //Change with repo's README file
    baseUrl: "", //Include heroku base URL
    endpoints: [
      // Users
      // { method: "GET", path: "/api", description: "Describes all available endpoints"},
      // { method: "GET", path: "/api/users", adescription: "Get all users" },
      // { method: "GET", path: "/api/users/:id", adescription: "Get 1 user" },
      // { method: "POST", path: "/api/users", description: "Create a new user" },
      // { method: "PUT", path: "/api/users/:id", description: "Update a user" },
      // { method: "DELETE", path: "/api/users/:id", description: "Delete a user"},

      //Posts
      { method: "GET", path: "/api/posts", description: "Get all posts" },
      { method: "GET", path: "/api/posts/:id", description: "Get 1 post" },
      {
        method: "GET",
        path: "/api/posts/:postName",
        description: "Get 1 post"
      },
      { method: "POST", path: "/api/posts", description: "Create a new post" },
      { method: "PUT", path: "/api/posts/:id", description: "Update a post" },
      {
        method: "DELETE",
        path: "/api/posts/:id",
        description: "Delete a post"
      },

      //Cities
      { method: "GET", path: "/api/cities", description: "Get all cities" },
      { method: "GET", path: "/api/cities/:id", description: "Get 1 city" },
      { method: "POST", path: "/api/cities", description: "Create a new city" },
      { method: "PUT", path: "/api/cities/:id", description: "Update a city" },
      {
        method: "DELETE",
        path: "/api/cities/:id",
        description: "Delete a city"
      }
    ]
  });
});

// CRUD FOR USERS
app.get("/api/users", (req, res) => {
  db.Users.find({}, (error, users) => {
    res.json(users);
  });
});

app.get("/api/users/:id", (req, res) => {
  db.Users.find({ _id: req.params.id }, (error, users) => {
    res.json(users);
  });
});

app.post("/api/users", (req, res) => {
  var newUser = new db.Users({
    userFullName: req.body.userFullName,
    username: req.body.username,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
    userCity: req.body.userCity,
    userPhoto: req.body.userPhoto,
    userJoinDate: Date()
  });
  newUser.save((error, user) => {
    res.json(user);
  });
});

app.put("/api/users/:id", (req, res) => {
  console.log("update user", req.params);
  console.log("the body is", req.body);
  const userId = req.params.id;
  db.Users.findOneAndUpdate(
    { _id: userId },
    req.body,
    { new: true },
    (err, updateUser) => {
      if (err) {
        throw err;
      }
      res.json(updateUser);
    }
  );
});

app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  console.log("delete user", userId);
  db.Users.findOneAndDelete({ _id: userId }, (err, deletedUser) => {
    if (err) {
      throw err;
    }
    res.json(deletedUser);
  });
});

// CRUD FOR POSTS
app.get("/api/posts", (req, res) => {
  db.Posts.find({})
    .populate("user")
    .exec((error, posts) => {
      res.json(posts);
    });
});

app.get("/api/posts/:id", (req, res) => {
  db.Posts.find({ _id: req.params.id })
    .populate("user")
    .populate("city")
    .exec((error, posts) => {
      res.json(posts);
    });
});

app.get("/api/posts/:id/user", (req, res) => {
  res.json(posts);
});

app.post("/api/posts", (req, res) => {
  db.Users.findOne({ _id: req.body.user }).exec((err, foundUser) => {
    db.Cities.findOne({ _id: req.body.city }).exec((err, foundCity) => {
      var newPost = new db.Posts({
        postTitle: req.body.postTitle,
        postContent: req.body.postContent,
        postDate: Date(), //req.body.postDate,
        user: foundUser,
        city: foundCity
      });
      newPost.save((error, post) => {
        if (error) {
          res.end(error.message);
        } else {
          res.json(post);
        }
      });
    });
  });
});
// Testing
app.post("/api/userposts/:id", (req, res) => {
  db.Users.findOne({ _id: req.params.id }).exec((err, foundUser) => {
    if (err) {
      return console.log(`can't find user error:`, err);
    }
    console.log(`Found User ${foundUser}`);
    if (foundUser) {
      var newPost = new db.Posts({
        postTitle: req.body.postTitle,
        postContent: req.body.postContent,
        postDate: req.body.postDate,
        user: foundUser._id,
        city: {
          cityName: req.body.cityName,
          cityPhoto: req.body.cityPhoto
        }
      });
      console.log(newPost);
      newPost.save((error, post) => {
        if (error) {
          console.log(`can't save new post error: ${error}`);
          res.send(error.message);
        } else {
          res.json(post);
        }
      });
    } else {
      console.log("Whoops");
      res.send("You Done Messed Up A-Aron");
    }
  });
});

//
app.post("/api/userposts/:id", (req, res) => {
  db.Users.findOne({ _id: req.params.id }).exec((err, foundUser) => {
    if (err) {
      return console.log(`can't find user error:`, err);
    }
    console.log(`Found User ${foundUser}`);
    if (foundUser) {
      var newPost = new db.Posts({
        postTitle: req.body.postTitle,
        postContent: req.body.postContent,
        postDate: req.body.postDate,
        user: foundUser._id,
        city: foundCity._id
      });
      console.log(newPost);
      newPost.save((error, post) => {
        if (error) {
          console.log(`can't save new post error: ${error}`);
          res.send(error.message);
        } else {
          res.json(post);
        }
      });
    } else {
      console.log("Whoops");
      res.send("You Done Messed Up A-Aron");
    }
  });
});
//
app.get("/api/userposts/:id", (req, res) => {
  db.Users.findOne({ _id: req.params.id }).exec((err, foundUser) => {
    if (err) {
      console.log(`can't find user error:`, err);
    }
    console.log(`Found User ${foundUser}`);
    db.Posts.find({ user: foundUser._id }, (err, foundPosts) => {
      if (err) {
        console.log(`can't find posts of user ${err}`);
      }
      res.json(foundPosts);
      console.log(foundPosts);
    });
  });
});

app.put("/api/posts/:id", (req, res) => {
  console.log("update post", req.params);
  console.log(`the body is${req.body}`);
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

app.delete("/api/posts/:id", (req, res) => {
  const postId = req.params.id;
  console.log("delete post", postId);
  db.Posts.findOneAndDelete({ _id: postId }, (err, deletedPost) => {
    if (err) {
      throw err;
    }
    res.json(deletedPost);
  });
});

//CRUD FOR CITIES

app.get("/api/cities", (req, res) => {
  db.Cities.find({}, (error, foundCities) => {
    res.json(foundCities);
  });
});

app.get("/api/cities/:id", (req, res) => {
  db.Cities.find({ _id: req.params.id }, (error, foundCity) => {
    res.json(foundCity);
  });
});

///////

app.post("/api/cities/:id/post", (req, res) => {
  let newPost = new db.Post({
    postTitle: req.body.postTitle,
    postContent: req.body.postContent,
    postDate: req.body.postDate,
    city: req.params.id,
    user: req.body.id
  });
  newPost.save((error, rating) => {
    res.json(post);
  });
});

app.post("/api/posts/city/:id", (req, res) => {
  let newPost = new db.Post({
    postTitle: req.body.postTitle,
    postContent: req.body.postContent,
    postDate: req.body.postDate,
    city: req.params.id,
    user: req.body.id
  });
  newPost.save((error, rating) => {
    res.json(post);
  });
});

///////

app.post("/api/cities", (req, res) => {
  var newCity = new db.Cities({
    cityName: req.body.cityName,
    cityPhoto: req.body.cityPhoto
  });
  newCity.save((error, newCity) => {
    res.json(newCity);
  });
});

app.put("/api/cities/:id", (req, res) => {
  console.log("update cities", req.params);
  console.log(`the body is${req.body}`);
  const cityId = req.params.id;
  db.Cities.findOneAndUpdate(
    { _id: cityId },
    req.body,
    { new: true },
    (err, updatedCity) => {
      if (err) {
        throw err;
      }
      res.json(updatedCity);
    }
  );
});

app.delete("/api/cities/:id", (req, res) => {
  const cityId = req.params.id;
  console.log("delete city", cityId);
  db.Cities.findOneAndDelete({ _id: cityId }, (err, deletedCity) => {
    if (err) {
      throw err;
    }
    res.json(deletedCity);
  });
});

app.listen(process.env.PORT || 3001, () =>
  console.log("Listening on port 3001 :)")
);
