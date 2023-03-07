const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

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

    for (let i = 0; i < emailList.length; i++) {
      setTimeout(() => {
        const mailConfigs = {
          from: senderEmail,
          to: emailList[i],
          subject: subject,
          text: message,
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
