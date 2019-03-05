const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  cityName: String,
  cityPhoto: String,
});

const Cities = mongoose.model('Cities', CitySchema);
module.exprorts = Cities;