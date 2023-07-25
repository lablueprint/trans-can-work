const nodemailer = require('nodemailer');
require('dotenv').config();
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

// email credentials
const senderEmail = process.env.SENDER_EMAIL;
const senderPassword = process.env.SENDER_PASS;

const NoProgressEmail = ({ emailList, subject, message }) => new Promise((resolve, reject) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });

  const viewPath = path.resolve('./templates/views');
  const partialsPath = path.resolve('./templates/partials');

  const handlebarOptions = {
    viewEngine: {
      extName: '.handlebars',
      layoutsDir: viewPath,
      defaultLayout: false,
      partialsDir: partialsPath,
      // express,
    },
    viewPath,
    extName: '.handlebars',
  };

  transporter.use('compile', hbs(handlebarOptions));

  const testerEmail = ['arwaidev@gmail.com'];
  const image = { filename: 'trans_flag_graphic.png', path: path.resolve(__dirname, '../assets/trans_flag_graphic.png') };

  for (let i = 0; i < testerEmail.length; i++) {
    setTimeout(() => {
      const mailConfigs = {
        from: senderEmail,
        to: testerEmail[i],
        subject,
        template: 'index',
        context: {
          username: emailList[i],
          message,
          image,
        },
        attachments: [
          { filename: 'trans_flag_graphic.png', path: path.resolve(__dirname, '../assets/trans_flag_graphic.png') },
        ],
      };

      transporter.sendMail(mailConfigs, (error, info) => {
        if (error) {
          console.log(error);
          return reject({ message: 'transporter sendMail error' });
        }
        return resolve({ message: 'email sent successfully' });
      });
    }, i * 1000); // 1 email per second
  }
});

module.exports = NoProgressEmail;
