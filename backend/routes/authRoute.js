const express = require("express");
const {
  registrationController,
  loginController,
  verifyEmailController,
} = require("../controllers/authControllers");
const { verificationEmail } = require("../utils/emailSender");
const router = express.Router();

router.post("/registration", registrationController);
router.post("/login", loginController);
router.post("/verify/:token", verifyEmailController);

module.exports = router;
