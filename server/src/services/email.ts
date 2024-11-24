import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

// Create a transporter using your email service credentials
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com', // Replace with your SMTP server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER, // your email address
        pass: process.env.SMTP_PASS, // your app password
    },
});

// Function to send an email
export const sendEmail = async (to: string, subject: string, html: string) => {
    const mailOptions = {
        from: '"Storylax"', // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
