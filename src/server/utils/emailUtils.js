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
    from: 'Pantry <pantry@' + process.env.MAILGUN_DOMAIN + '>',
    to: "deborah78@ethereal.email",
    subject: "Pantry - Please Confirm Your Email Address",
    text: "Please confirm your email by clicking the following link: " + (process.env.NODE_ENV === "production" ? process.env.PROD_DOMAIN : process.env.DEV_DOMAIN) + "/confirmEmail/" + confirmToken
  }
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass
    }
  });

  let info = await transporter.sendMail(message);
  console.log("Sending confirmation email to " + testAccount.user);
  // console.log("Sending confirmation email to " + email);
  console.log("Message preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = { verifyEmail, sendConfirmationEmail };