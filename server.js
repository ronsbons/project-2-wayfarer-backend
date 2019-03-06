const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/user.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.listen(process.env.PORT || 3001, () =>
  console.log("Listening on port 3001 :)")
);

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
      { method: "GET", path: "/api/posts/:postName", description: "Get 1 post"},
      { method: "POST", path: "/api/posts", description: "Create a new post" },
      { method: "PUT", path: "/api/posts/:id", description: "Update a post" },
      { method: "DELETE", path: "/api/posts/:id", description: "Delete a post"},

      //Cities
      { method: "GET", path: "/api/cities", description: "Get all cities" },
      { method: "GET", path: "/api/cities/:id", description: "Get 1 city" },
      { method: "POST", path: "/api/cities", description: "Create a new city" },
      { method: "PUT", path: "/api/cities/:id", description: "Update a city" },
      { method: "DELETE", path: "/api/cities/:id", description: "Delete a city"}
    ]
  });
});
