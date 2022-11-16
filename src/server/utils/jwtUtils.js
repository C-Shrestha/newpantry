const jwt = require('jsonwebtoken');

const genToken = (payload, secret) => {
  return jwt.sign(payload, secret, { expiresIn: '1800s' });
};

const authToken = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403).send("Not authorized - invalid token");
    } else {
      req.user = user

      next()
    }
  })
};

module.exports = { genToken, authToken };