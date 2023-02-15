const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const port = 3001;

const senderEmail = '';
const senderPassword = '';
const receiverEmail = '';

const SendEmail = () => {
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
            to: receiverEmail,
            subject: 'Testing Single Email',
            text: 'Body text of the email.'
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

app.get('/', (req, res) => {
    SendEmail()
        .then(response => res.send(response.message))
        .catch(error => res.status(500).send(error.message));
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});