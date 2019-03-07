const db = require("./models");

const myUsers = [
  {
    userFullName: "Mary",
    username: "maryb",
    userEmail: "maryb@gmail.com",
    userPassword: "supersecret",
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
    cityName: "London",
    cityPhoto: "london.png"
  },
  {
    cityName: "Sydney",
    cityPhoto: "sydney.png"
  },
  {
    cityName: "San Francisco",
    cityPhoto: "san_francisco.png"
  },
  {
    cityName: "Seattle",
    cityPhoto: "seattle.png"
  },
  {
    cityName: "Tokyo",
    cityPhoto: "tokyo.png"
  },
  {
    cityName: "Copenhagen",
    cityPhoto: "copenhagen.png"
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
