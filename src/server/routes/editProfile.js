const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { authToken } = require('../utils/jwtUtils');

router.get('/', async(req, res) => {
  res.status(200).send("Hello world");
});

router.post('/', authToken, async(req, res) => {
  console.log("Hello world");
  await User.findOne( { email: req.body.email } ).then((user) => {
    if (user) {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.password = req.body.password;
      user.save();
      res.status(200).send(user);
    } else {
      res.status(400).send("Invalid email");
    }
  });
});

module.exports = router;