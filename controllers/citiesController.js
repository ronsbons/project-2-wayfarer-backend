const db = require ('../models');

module.exports = {
  show: (req, res) => {
    db.Cities.find({}, (error, foundCities) => {
      res.json(foundCities);
    });
  }
};