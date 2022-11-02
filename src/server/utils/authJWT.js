const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).send("Token is missing");

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.status(403).send("Invalid token");

    req.user = user

    next()
  })
};

module.exports = { authToken };