const express = require('express');
const router = express.Router();

const { sendRecoveryEmail } = require('../utils/emailUtils');

router.get('/', async (req, res) => {
  await User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      user.recoveryToken = crypto.randomBytes(20).toString('hex');
      user.save();
      sendRecoveryEmail(req.body.email, user.recoveryToken);
      res.status(200).send("Recovery email sent - please check your email");
    }
  }).catch((err) => {
    res.status(400).send(err);
  });
});

router.get('/:recoveryToken', async (req, res) => {
  await User.findOne({ recoveryToken: req.params.recoveryToken }).then((user) => {
    if (user) {
      user.password = req.params.recoveryToken;
      user.save();
      res.status(200).send(`Password changed to: ${req.params.recoveryToken} - please close this tab and login`);
    }
  }).catch((err) => {
    res.status(400).send(err);
  });
});

module.exports = router;