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
    db.Cities.find({ _id: request.params.id }, (error, foundCity) => {
      if (error) {
        console.log(`can't find city error: ${error}`);
      }
      response.json(foundCity);
      console.log(`find one city: ${foundCity}`);
    });
  },

  create: (request, response) => {
    var newCity = new db.Cities({
      cityName: request.body.cityName,
      cityPhoto: request.body.cityPhoto
    });
    newCity.save((error, newCity) => {
      if (error) {
        console.log(`can't create new city: ${error}`);
      }
      response.json(newCity);
      console.log(`new city created: ${newCity}`);
    });
  },

  update: (request, response) => {
    console.log('update cities', request.params);
    console.log('the body is ', request.body);
    const cityId = request.params.id;
    db.Cities.findOneAndUpdate(
      { _id: cityId },
      request.body,
      { new: true },
      (err, updatedCity) => {
        if (err) {
          console.log(`can't update city: ${err}`);
        }
        response.json(updatedCity);
        console.log(`city updated: ${updatedCity}`);
      }
    );
  },

  delete: (request, response) => {
    const cityId = request.params.id;
    console.log("delete city", cityId);
    db.Cities.findOneAndDelete({ _id: cityId }, (err, deletedCity) => {
      if (err) {
        console.log(`can't delete city: ${err}`);
      }
      response.json(deletedCity);
      console.log(`city deleted: ${deletedCity}`);
    });  
  },
};