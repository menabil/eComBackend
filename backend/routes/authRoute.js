const express = require("express");
const {
  registrationController,
  loginController,
  verifyEmailController,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const router = express.Router();

router.post("/registration", registrationController);
router.post("/login", loginController);
router.post("/verify/:token", verifyEmailController);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
