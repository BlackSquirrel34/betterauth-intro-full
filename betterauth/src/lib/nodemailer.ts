import nodemailer from "nodemailer";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const NODEMAILER_USER = process.env.NODEMAILER_USER;
const NODEMAILER_APP_PASSWORD = process.env.NODEMAILER_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: false, // Posteo uses STARTTLS, so set secure to false
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_APP_PASSWORD,
  },
});

export default transporter;
