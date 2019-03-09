const db = require ('../models');

module.exports = {
  show: (req, res) => {
    db.Cities.find({}, (error, foundCities) => {
      if (error) {
        console.log(`can't find cities: ${error}`);
      }
      res.json(foundCities);
      console.log(foundCities);
    });
  },
};