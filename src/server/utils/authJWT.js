const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = "25eb740bca63b99c927cac57956eb1ab74486ad8bf9ae9b798df854a83ed69a0b8a5e06399d7dac3043ea17d250a3fe1ec6559cd80bf4d0848feac3efad6a92b";

const authToken = (req, res, next) => {
  
  const token = req.headers.authorization;

  jwt.verify(token, TOKEN_SECRET, (err, user) => {

    if (err) {
      res.status(403).send("Not authorized - invalid token");
    } else {
      req.user = user

      next()
    }
  })
};

module.exports = { authToken };