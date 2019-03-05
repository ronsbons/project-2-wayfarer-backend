const
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  cors = require('cors'),
  userRoutes = require('./routes/user.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/user', userRoutes);

app.listen(process.env.PORT || 3001, () => console.log('Listening on port 3001 :)'));