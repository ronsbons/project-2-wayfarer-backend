const db = require ('../models');

module.exports = {
  // shows all cities
  // THIS WORKS
  show: (req, res) => {
    db.Cities.find({}, (error, foundCities) => {
      if (error) {
        console.log(`can't find cities: ${error}`);
      }
      res.json(foundCities);
      console.log(foundCities);
    });
  },

  // shows one city
  showOneCity: (request, response) => {
    db.Cities.find({ _id: req.params.id }, (error, foundCity) => {
      if (error) {
        console.log(`can't find city error: ${error}`);
      }
      res.json(foundCity);
      console.log(`find one city: ${foundCity}`);
    });
  }
};