require('dotenv').config();

const port = process.env.PORT || 5000;
const dbURL = process.env.MONGODB_URI;

const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') 
{
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
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

// Endpoints
app.get('/', bodyParser, (req, res) => {
  res.send("Hello world!");
});

const signup = require('./routes/signup');
app.use('/signup', signup);

const login = require('./routes/login');
app.use('/login', login);

const users = require('./routes/users');
app.use('/users', users);

app.listen(port, () => {
  console.log('-----PORT OPEN---SERVER CHECK VALID------')
});