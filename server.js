const
  express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(process.env.PORT || 3001, () => console.log('Listening on port 3001 :)'));