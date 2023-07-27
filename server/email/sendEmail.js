const nodemailer = require('nodemailer');
require('dotenv').config();
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const senderEmail = process.env.SENDER_EMAIL;
const senderPassword = process.env.SENDER_PASS;

const SendEmail = ({
  email, fullName, subject, message,
}) => new Promise((resolve, reject) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });

  const viewPath = path.resolve('./templates');

  const handlebarOptions = {
    viewEngine: {
      extName: '.handlebars',
      layoutsDir: viewPath,
      defaultLayout: false,
      partialsDir: viewPath,
    },
    viewPath,
    extName: '.handlebars',
  };

  transporter.use('compile', hbs(handlebarOptions));

  const mailConfigs = {
    from: senderEmail,
    to: email,
    subject,
    template: 'index',
    context: {
      name: fullName,
      message,
    },
  };

  transporter.sendMail(mailConfigs, (error, info) => {
    if (error) {
      return reject(error);
    }
    return resolve({ message: 'email sent successfully', info });
  });
});

module.exports = SendEmail;
