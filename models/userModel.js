const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userFullName: String,
  username: String,
  userEmail: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ ,
  },
  userPassword: {
    type: String,
    required: true,
    select: false,
  },
  userCity: String,
  userPhoto: String,
  userJoinDate: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model('', UserSchema);
module.exprorts = Users;