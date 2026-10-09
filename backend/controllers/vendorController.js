let Cat = require("../models/categorySchema");
let SubCat = require("../models/subCategorySchema");

let createCategory = async (req, res) => {
  let { name, owner } = req.body;

  let existingName = await Cat.findOne({ name: name.toLowerCase() });

  if (existingName) {
    return res.status(400).json({
      success: false,
      message: "Category already exists",
    });
  }

  let cat = await new Cat({
    name: name.toLowerCase(),
    owner: owner,
  }).save();

  return res.status(201).json({
    success: true,
    message: "Category created",
  });
};

let getAllCategory = async (req, res) => {
  let cat = await Cat.find({}).populate("owner");
  // let cat = await Cat.find({}).populate({
  //   path: "owner",
  //   select: "-password",
  // });

  return res.status(200).json({
    success: true,
    message: "All category",
    data: cat,
  });
};

let createSubCategory = async (req, res) => {
  let { name, parentCategory } = req.body;

  let existingName = await SubCat.findOne({ name: name.toLowerCase() });

  if (existingName) {
    return res.status(400).json({
      success: false,
      message: "Sub category already exists",
    });
  }

  let subCat = await new SubCat({
    name: name.toLowerCase(),
    parentCategory: parentCategory,
  }).save();

  let catUpdate = await Cat.findByIdAndUpdate(
    { _id: parentCategory },
    { $push: { subCategory: subCat._id } },
  );

  return res.status(201).json({
    success: true,
    message: "Sub category created",
  });
};

let getAllSubCategory = async (req, res) => {
  let SubCat = await SubCat.find({}).populate("parentCategory");

  return res.status(200).json({
    success: true,
    message: "All sub category",
    data: SubCat,
  });
};

let getAllCategoryWiseSubCategory = async (req, res) => {
  let { id } = req.params;
  let SubCat = await SubCat.find({ parentCategory: id });

  return res.status(200).json({
    success: true,
    message: "All category wise sub category",
    data: SubCat,
  });
};

let getAllOwnerWiseSubCategory = async (req, res) => {
  let { id } = req.params;

  // promise start
  let data = await Cat.find({ owner: id }).lean();
  let promise = new Promise(function (resolve, reject) {
    let cat = [];
    data.map(async (item) => {
      let allData = await SubCat.find({ parentCategory: item._id });
      cat.push({
        ...item,
        subCategory: allData,
      });
        if (data.length == cat.length) {
          resolve(cat);
        }
    });
  });

  promise.then((value) => {
    return res.status(200).json({
      success: true,
      message: "All owner wise category",
      data: value,
    });
  });

  return res.status(200).json({
    success: true,
    message: "All owner wise category",
    data: data,
  });
  // promise end
};

module.exports = {
  createCategory,
  getAllCategory,
  createSubCategory,
  getAllSubCategory,
  getAllCategoryWiseSubCategory,
  getAllOwnerWiseSubCategory,
};
