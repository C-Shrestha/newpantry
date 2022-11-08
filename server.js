require('dotenv').config();

const port = process.env.PORT || 5000;
const dbURL = process.env.dbURL;

const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

app.set('port', port);
app.use(cors());
app.use(bodyParser.json());
app.disable('x-powered-by');

if (process.env.NODE_ENV === 'production') 
{
  app.use(express.static('src/client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src/client', 'build', 'index.html'));
  });
}

const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient; 
const client = new MongoClient(dbURL);
client.connect();

mongoose.connect(dbURL).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('-----DB opening-----successfully connected to the database'));

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

// Endpoints
app.get('/api', (req, res) => {
  res.send("Hello world!");
});

const signup = require('./src/server/routes/signup');
app.use('/api/signup', signup);

const login = require('./src/server/routes/login');
app.use('/api/login', login);

const users = require('./src/server/routes/users');
app.use('/api/users', users);

const search = require('./src/server/routes/search');
app.use('/api/search', search);

const favorites = require('./src/server/routes/favorites');
app.use('/api/favorites', favorites);

const categories = require('./src/server/routes/categories');
app.use('/api/categories', categories);

app.listen(port, () => {
  console.log('-----PORT OPEN---SERVER CHECK VALID------')
});