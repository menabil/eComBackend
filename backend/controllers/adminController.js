let User = require("../models/userSchema");
let Cat = require("../models/categorySchema");

// All User
let allUser = async (req, res) => {
  let users = await User.find({}).select("-password");

  return res.status(200).json({
    success: true,
    message: `${users.length} users found`,
    data: users,
  });
};

// Single User
let singleUser = async (req, res) => {
  let { id } = req.params;

  let data = await User.findById({ _id: id }).select("-password");

  return res.status(200).json({
    success: true,
    message: "User info",
    data: data,
  });
};

// Active User
let activeUser = async (req, res) => {
  let data = await User.find({ status: "active" });

  return res.status(200).json({
    success: true,
    message: "Active user info",
    data: data,
  });
};

// Deactive User
let deactiveUser = async (req, res) => {
  let data = await User.find({ status: "deactive" });

  return res.status(200).json({
    success: true,
    message: "Deactive user info",
    data: data,
  });
};

// Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User deleted",
  });
};

// Update User
let updateUser = async (req, res) => {
  let { id } = req.params;
  await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });

  return res.status(200).json({
    success: true,
    message: "User Updated",
  });
};

// Update Category
const categoryUpdate = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updateCategory = await Cat.findByIdAndUpdate(
    { id: id },
    { status: status },
    { new: true },
  );

  if (!updateCategory) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Category updated",
  });
};

// Delete Category
const deleteCategory = async (req, res) => {
  let { id } = req.params;

  const deletedCategory = await Cat.findByIdAndDelete(id);

  if (!deletedCategory) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Category deleted",
  });
};

// Category Status
const categoryStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedCategory = await Cat.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );

  if (!updatedCategory) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Category status updated",
    data: updatedCategory,
  });
};

module.exports = {
  allUser,
  singleUser,
  activeUser,
  deactiveUser,
  deleteUser,
  updateUser,
  categoryUpdate,
  deleteCategory,
  categoryStatus,
};
