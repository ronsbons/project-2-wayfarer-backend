const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

});

const Users = mongoose.model('', UserSchema);
module.exprorts = Users;