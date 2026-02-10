
const nodemailer = require("nodemailer");
require('dotenv').config();

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from: 'Study Notion || Code Help',
            to: `${email}`,
            subject: `${title}`,
            html: `<b>${body}</b>`
        })
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch(err){
        console.log("Error occurred while sending mail", err);
    }
}
module.exports = mailSender;