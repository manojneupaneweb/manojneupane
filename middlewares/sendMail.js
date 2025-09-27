import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.mail,
    pass: process.env.mail_password,
  },
});

const sendMail = async ({ subject, html }) => {
  try {
    const mailOptions = {
      from: process.env.mail,
      to:process.env.send_to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📨 Email sent to ${process.env.send_to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

export default sendMail;
