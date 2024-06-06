import nodemailer from "nodemailer";

const NODEMAILER_USER = process.env.NODEMAILER_USER as string;
const NODEMAILER_PASS = process.env.NODEMAILER_PASS as string;

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  }
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  await transport.sendMail({
    from: "portfolio@mail.com",
    to,
    subject,
    html,
  });
};