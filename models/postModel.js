const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  // there's a "mongoose validator" package that could help us limit length of post title
  // https://github.com/leepowellcouk/mongoose-validator
  postTitle: String,
  // does making postContent required satisfy the "must not be empty" requirement?
  postContent: String,
  postDate: {
    type: Date,
    default: Date.now,
  },
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'Users',
  }],
  city: [Cities],
});

const Posts = mongoose.model('Posts', PostSchema);
module.exprorts = Posts;