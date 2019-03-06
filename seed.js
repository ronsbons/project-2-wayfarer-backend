const db = require("./models");

const myCities = [
  {
    cityName: "Colorado",
    cityPhoto: "photo.png"
  },
  {
    cityName: "Wisconsin",
    cityPhoto: "image.png"
  }
];

const myUsers = [
  {
    userFullName: "Mary",
    username: "maryb",
    userEmail: "dfnsivs@gmail.com",
    userPassword: "something",
    userCity: "napa",
    userPhoto: "pho",
    userJoinDate: Date()
  }, //'2019-03-05'

  {
    userFullName: "sds",
    username: "dsda",
    userEmail: "dfnsivs@gmail.com",
    userPassword: "dsfsd",
    userCity: "de",
    userPhoto: "im",
    userJoinDate: Date()
  }
];

const myPosts = [{
    postTitle: "ColPost",
    postContent: "bahahahaha",
    postDate: "2018-3-12",
    user: '5c7e84d9b237be0aec72b8ac',
    city: {
        cityName: "Colorado",
        cityPhoto: "photo.png"
        }
    },
    {
        postTitle: "WisPost",
        postContent: "dfnjdfn",
        postDate: "2018-3-12",
        user: '5c7e84d9b237be0aec72b8ac',
        city: {
          cityName: "Wisconsin",
          cityPhoto: "image.png"
        }
    }
]

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

        db.Posts.deleteMany({}, (err, cities) => {
            console.log('removed posts');
    
            db.Posts.create(myPosts, (err, cities) => {
                if(err) { console.log(err); }
                console.log('created all posts');
                console.log(`created ${myPosts.length} posts`);
            });
        });
      });
    });



  });
});
