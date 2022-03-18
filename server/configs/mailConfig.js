import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SEND_HOST,
    port: process.env.MAIL_SEND_PORT,
    secure: true,
    auth: {
        user: process.env.Mail_SEND_USER,
        pass: process.env.MAIL_SEND_PASS
    }
});

transporter.verify().then(() => console.log("nice"))

export default transporter;