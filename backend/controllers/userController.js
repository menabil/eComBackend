const jwt = require("jsonwebtoken");
let Cat = require("../models/categorySchema");
const { adminEmail } = require("../utils/emailSender");

let userController = async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS);

    await User.findByIdAndUpdate(decoded._id, req.body, { new: true });

    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

let createCategory = async (req, res) => {
  let { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Please fill name",
    });
  }

  const existingCategory = await Categories.findOne({
    name: name.toLowerCase(),
  });

  if (existingCategory) {
    return res.status(400).json({
      success: false,
      message: "Category already exist",
    });
  }

  await new Categories({
    name: name.toLowerCase(),
  }).save();

  const admin = await User.findOne({ role: "admin" });

  if (admin) {
    await adminEmail(admin.email, name);
  }

  return res.status(201).json({
    success: true,
    message: "Category created",
  });
};

let getAllCategory = async (req, res) => {
  let category = await Cat.find({});

  return res.status(200).json({
    success: true,
    message: "All category",
    data: category,
  });
};

module.exports = { userController, createCategory, getAllCategory };
