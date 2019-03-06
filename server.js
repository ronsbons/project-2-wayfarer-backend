const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/user.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.listen(process.env.PORT || 3001, () =>
  console.log("Listening on port 3001 :)")
);
