const db = require("./models");

const myUsers = [
  {
    userFullName: "Mary",
    username: "maryb",
    userEmail: "maryb@gmail.com",
    userPassword: "$2b$10$s18yu453IbMj3SnyhnWl8e.V6kr2uAuOBcyMmf8AVyiIm/ntvSeca",
    userCity: "San Antonio",
    userPhoto: "profile1.png",
    userJoinDate: Date()
  },

  {
    userFullName: "John",
    username: "johncd",
    userEmail: "johncd@gmail.com",
    userPassword: "Carrot2",
    userCity: "Los Angeles",
    userPhoto: "profile2.png",
    userJoinDate: Date()
  }
];

const myCities = [
  {
    cityName: "Colorado",
    cityPhoto: "colorado.png"
  },
  {
    cityName: "Wisconsin",
    cityPhoto: "wisconsin.png"
  }
];

db.Cities.deleteMany({}, (err, cities) => {
  console.log("removed cities");

  db.Cities.create(myCities, (err, cities) => {
    if (err) {
      console.log(err);
    }
    console.log("created all cities");
    console.log(`created ${myCities.length} cities`);
    db.Users.deleteMany({}, (err, users) => {
      console.log("removed users");

      db.Users.create(myUsers, (err, users) => {
        if (err) {
          console.log(err);
        }
        console.log("created all users");
        console.log(`created ${myUsers.length} users`);
      });
    });
  });
});
