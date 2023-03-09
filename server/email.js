const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

// email credentials
const senderEmail = process.env.SENDER_EMAIL;
const senderPassword = process.env.SENDER_PASS;

const SendEmail = ({ emailList, subject, message }) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./templates/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./templates/"),
    };

    transporter.use("compile", hbs(handlebarOptions));

    const testerEmail = ["arwaidev@gmail.com"];

    for (let i = 0; i < testerEmail.length; i++) {
      setTimeout(() => {
        const mailConfigs = {
          from: senderEmail,
          to: testerEmail[i],
          subject: subject,
          template: "email",
          context: {
            username: emailList[i],
          },
        };

        transporter.sendMail(mailConfigs, (error, info) => {
          if (error) {
            console.log(error);
            return reject({ message: "transporter sendMail error" });
          }
          return resolve({ message: "email sent successfully" });
        });
      }, i * 1000); // 1 email per second
    }
  });
};

module.exports = SendEmail;
