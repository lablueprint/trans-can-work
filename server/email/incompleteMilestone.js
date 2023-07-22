const nodemailer = require('nodemailer');
// const dotenv = require('dotenv').config();
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const image = require('../assets/trans_flag_graphic.png');

// email credentials
const senderEmail = process.env.SENDER_EMAIL;
const senderPassword = process.env.SENDER_PASS;

const MilestoneEmail = ({ emailList, subject, message }) => new Promise((resolve, reject) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extname: '.handlebars',
      defaultLayout: false,
      partialsDir: path.resolve('./templates'),
    },
    viewPath: path.resolve('./templates'),
    extName: '.handlebars',
  };

  transporter.use('compile', hbs(handlebarOptions));

  const testerEmail = ['arwaidev@gmail.com'];

  const mailConfigs = {
    from: senderEmail,
    to: testerEmail,
    subject,
    template: 'incompleteMilestone',
    context: {
      username: emailList,
      message,
      image,
    },
  };

  transporter.sendMail(mailConfigs, (error, info) => {
    if (error) {
      console.log(error);
      return reject({ message: 'transporter sendMail error' });
    }
    return resolve({ message: 'email sent successfully' });
  });
});

module.exports = MilestoneEmail;
