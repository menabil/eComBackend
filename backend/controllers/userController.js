let Cat = require("../models/categorySchema");

let userController = async (req, res) => {};

let createCategory = async (req, res) => {
  let { name } = req.body;

  let existingName = await Cat.findOne({ name: name.toLowerCase() });

  if (existingName) {
    return res.status(400).json({
      success: false,
      message: "Category already exists",
    });
  }

  let cat = await new Cat({
    name: name.toLowerCase(),
  }).save();

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
