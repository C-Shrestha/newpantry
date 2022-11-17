const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { genToken } = require('../utils/jwtUtils');

router.post('/', async (req, res) => {
  const loginUser = {
    email: req.body.email,
    password: req.body.password
  };

  await User.findOne({ email: loginUser.email }).then((user) => {
    if (user) {
      if (user.password === loginUser.password) {
        if (user.valid) {
          const token = genToken({ email: loginUser.email }, process.env.JWT_SECRET);
          res.status(200).set("authorization", token).send(user);
        } else {
          res.status(401).send("User email not verified");
        }
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