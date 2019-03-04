const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({

});

const Posts = mongoose.model('', PostSchema);
module.exprorts = Posts;