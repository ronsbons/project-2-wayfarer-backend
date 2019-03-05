const
  bcrypt = require('bcrypt'),
  db = require ('../models'),
  jwt = require('jsonwebtoken');

module.exports = {
  signup: (request, response) => {
    console.log(request.body);
    console.log('sign up');
  },

  login: (request, response) => {
    console.log('login');
    console.log(request.body);
  },

  show: (request, respones) => {
    console.log('show');
    // request.userId from user route
    console.log(request.userId);
  }
};