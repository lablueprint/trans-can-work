const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

// email credentials
const senderEmail = process.env.SENDER_EMAIL;
const senderPassword = process.env.SENDER_PASS;

const SendEmail = ({ email, subject, message }) => {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: senderEmail,
                pass: senderPassword
            }
        });

        const mailConfigs = {
            from: senderEmail,
            to: email,
            subject: subject,
            text: message
        }

        transporter.sendMail(mailConfigs, (error, info) => {
            if (error) {
                console.log(error);
                return reject({ message: 'transporter sendMail error' });
            }
            return resolve({ message: 'email sent successfully' });
        });
    });
}

module.exports = SendEmail;