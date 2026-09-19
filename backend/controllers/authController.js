const User = require("../models/userSchema");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const jwt = require("jsonwebtoken");
const {
  verificationEmail,
  forgotPasswordEmail,
} = require("../utils/emailSender");

let registrationController = async (req, res) => {
  let existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email already exist",
    });
  }
  let { fullName, email, password, confirmPassword, terms } = req.body;

  if (!fullName || !email || !password || !confirmPassword || !terms) {
    return res.status(400).json({
      success: false,
      message: "Please fill the all fields",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email",
    });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid password",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password not match",
    });
  }

  const hash = bcrypt.hashSync(password, 10);

  const user = new User({
    fullName: fullName,
    email: email,
    password: hash,
    terms: terms,
  });

  let verificationToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_VERIFY_SECRET,
    {
      expiresIn: "7d",
    },
  );

  verificationEmail(email, verificationToken);

  return res.status(201).json({
    success: true,
    message: "Registration Done",
  });
};

let loginController = async (req, res) => {
  let { email, password } = req.body;

  let existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: "Invalid Credential",
    });
  }

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill the all fields",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email",
    });
  }

  let passCompare = await bcrypt.compare(password, existingUser.password);

  if (passCompare) {
    let accessToken = jwt.sign(
      {
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_VERIFY_SECRET,
      {
        expiresIn: "30d",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      data: {
        _id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        role: existingUser.role,
      },
      accessToken: accessToken,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid Credential",
    });
  }
};

let verifyEmailController = async (req, res) => {
  let { token } = req.params;

  let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

  await User.findByIdAndUpdate({ _id: decoded._id }, { isVerified: true });

  return res.status(200).json({
    success: true,
    message: "Email Verified",
  });
};

let forgotPassword = async (req, res) => {
  let { email } = req.body;

  let existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Please fill the all fields",
    });
  }

  let resetPasswordToken = jwt.sign(
    {
      _id: existingUser._id,
      email: existingUser.email,
    },
    process.env.JWT_VERIFY_SECRET,
    {
      expiresIn: "3m",
    },
  );

  forgotPasswordEmail(email, resetPasswordToken);

  return res.status(200).json({
    success: true,
    message: "Please check your email for resetting password",
  });
};

let resetPassword = async (req, res) => {
  let { token } = req.params;
  let { newPassword, confirmPassword } = req.body;

  let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

  if (decoded) {
    if (newPassword == confirmPassword) {
      const hash = bcrypt.hashSync(newPassword, 10);

      await User.findByIdAndUpdate({ _id: decoded._id }, { password: hash });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password not match",
      });
    }
  }

  return res.status(200).json({
    success: true,
    message: "Password update done",
  });
};

module.exports = {
  registrationController,
  loginController,
  verifyEmailController,
  forgotPassword,
  resetPassword,
};
