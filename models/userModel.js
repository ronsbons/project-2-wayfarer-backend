const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userFullName: String,
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

// backup method to delete password from the database result
UserSchema.set('toJSON', {
  // document, return, option
  transform: function (doc, ret, opt) {
    delete ret['userPassword']
    return ret
  },
});

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;

