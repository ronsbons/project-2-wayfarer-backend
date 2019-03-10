const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  postTitle: String,
  postContent: String,
  postDate: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'Cities'
  },
  // city: {
  //   cityName: String,
  //   cityPhoto: String
  // }
});

const Posts = mongoose.model('Posts', PostSchema);
module.exports = Posts;
