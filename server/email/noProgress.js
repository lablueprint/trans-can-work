const nodemailer = require('nodemailer');
require('dotenv').config();
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const senderEmail = process.env.SENDER_EMAIL;
const senderPassword = process.env.SENDER_PASS;

const NoProgressEmail = ({
  emailList, fullName,
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
  const subject = 'TCW - Incomplete Milestones';
  const message = 'It looks like you have some uncompleted milestones waiting for you over at TransCanWork. Ready to set sail and take the next step in your career?';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < emailList.length; i++) {
    setTimeout(() => {
      const mailConfigs = {
        from: senderEmail,
        to: emailList[i],
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
    }, i * 1000); // 1 email per second
  }
});

module.exports = NoProgressEmail;
