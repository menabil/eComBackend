const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendEmail = async (email, token) => {
  try {
    const info = await transporter.sendMail({
      from: '"Nabil" <nabil1000cc@gmail.com>',
      to: email,
      subject: "Please verify your email",
      text: `Please verify your email by clicking the link below: http://localhost:5000/verify/${token}`,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error sending mail:", err);
  }
};

module.exports = sendEmail;
