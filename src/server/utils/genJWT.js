const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const genToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1800s' });
};

module.exports = { genToken };