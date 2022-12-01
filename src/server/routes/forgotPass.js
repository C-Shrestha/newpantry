const express = require('express');
const router = express.Router();

const User = require('../models/user');
const crypto = require('crypto');
const md5 = require('md5');
const { sendRecoveryEmail } = require('../utils/emailUtils');

router.post('/', async (req, res) => {
  await User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      user.recoveryToken = crypto.randomBytes(20).toString('hex');
      user.save().then(() => {
        sendRecoveryEmail(req.body.email, user.recoveryToken);
      });
      res.status(200).send("Recovery email sent - please check your email");
    } else {
      res.status(404).send("Email not found");
    }
  }).catch((err) => {
    res.status(400).send(err);
    console.log(err);
  });
});

router.get('/:recoveryToken', async (req, res) => {
  await User.findOne({ recoveryToken: req.params.recoveryToken }).then((user) => {
    if (user) {
      user.password = md5(req.params.recoveryToken);
      user.save();
      res.status(200).send(`Password changed to: ${req.params.recoveryToken} - please close this tab and login`);
    } else {
      res.status(404).send("Token not found");
    }
  }).catch((err) => {
    res.status(400).send(err);
  });
});

module.exports = router;