const db = require('./models');

const myPosts = [
  {
    postTitle: 'San Francisco Trip Post',
    postContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    postDate: '2018-3-12',
    user: '5c83138bcfc5fe0017bde217',
    city: '5c83138bcfc5fe0017bde213'
  },
  {
    postTitle: 'London Trip Post',
    postContent: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    postDate: '2018-3-20',
    user: '5c83138bcfc5fe0017bde218',
    city: '5c83138bcfc5fe0017bde211'
  }
];

db.Posts.deleteMany({}, (err, posts) => {
  if (err) {
    console.log(`can't delete all posts: ${err}`);
  }
  console.log('removed posts');

  db.Posts.create(myPosts, (err, posts) => {
    if (err) {
      console.log(`can't create seed posts: ${err}`);
    }
    console.log('created all posts');
    console.log(`created ${myPosts.length} posts`);
  });
});
