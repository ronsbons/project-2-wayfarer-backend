const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wayfarer", {
  useNewUrlParser: true
});

module.exports.Users = require("./userModel.js");
module.exports.Posts = require("./postModel.js");
module.exports.Cities = require("./cityModel.js");
