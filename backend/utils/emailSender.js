const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

async function verificationEmail(email, token) {
  try {
    const info = await transporter.sendMail({
      from: "nabil1000cc@gmail.com",
      to: email,
      subject: "Please Verify Your Email",
      html: `<b>Verify Your Email <a href="http://localhost:5173/verify/${token}">Click here</a></b>`,
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}

async function forgotPasswordEmail(email, token) {
  try {
    const info = await transporter.sendMail({
      from: "nabil1000cc@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `<b>For resetting password <a href="http://localhost:5173/resetpassword/${token}">Click here</a></b>`,
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}

async function adminEmail(email, name) {
  try {
    const info = await transporter.sendMail({
      from: "nabil1000cc@gmail.com",
      to: email,
      subject: "Approve new category",
      html: `
        <b>Create a new category <a>${name}</a></b>
      `,
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}

module.exports = { verificationEmail, forgotPasswordEmail, adminEmail };
