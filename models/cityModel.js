const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({

});

const Cities = mongoose.model('', CitySchema);
module.exprorts = Cities;