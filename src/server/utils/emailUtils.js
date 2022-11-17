const nodemailer = require('nodemailer');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const mailgunClient = mailgun.client({ username: "api", key: process.env.MAILGUN_PRIV_API_KEY || "" });

const verifyEmail = async (email) => {
  try {
    const validationRes = await mailgunClient.validate.get(email);
    if (validationRes.result === "deliverable") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const sendConfirmationEmail = async (email, confirmToken) => {
  const message = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Pantry - Please Confirm Your Email Address",
    text: "Please confirm your email by clicking the following link: " + (process.env.NODE_ENV === "production" ? process.env.PROD_DOMAIN : process.env.DEV_DOMAIN) + "/confirmEmail/" + confirmToken
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

  transporter.sendMail(message);
};

module.exports = { verifyEmail, sendConfirmationEmail };