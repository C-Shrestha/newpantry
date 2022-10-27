const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
  await User.find(req.body).then((users) => {
    res.status(200).send(users);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

module.exports = router;