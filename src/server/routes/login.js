const express = require('express');
const router = express.Router();

const User = require('../models/user');
const bodyParser = require('body-parser').json();

router.post('/', bodyParser, async (req, res) => {
  var loginUser = {
    email: req.body.email,
    password: req.body.password
  };

  await User.findOne({ email: loginUser.email }).then((user) => {
    if (user) {
      if (user.password === loginUser.password) {
        res.status(200).send(user);
      } else {
        res.status(400).send("Invalid password");
      }
    } else {
      res.status(400).send("Invalid email");
    }
  }).catch((err) => {
    res.status(400).send(err);
  });
});

module.exports = router;