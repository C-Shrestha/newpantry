const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/:confirmToken', async (req, res) => {
  await User.findOne({ confirmToken: req.params.confirmToken }).then((user) => {
    if (user) {
      user.valid = true;
      user.save();
      res.status(200).send("Email confirmed - please close this tab and login");
    } else {
      res.status(400).send("Invalid token");
    }
  }).catch((err) => {
    res.status(400).send(err);
  });
});

module.exports = router;