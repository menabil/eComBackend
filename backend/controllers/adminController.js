const User = require("../models/userSchema");

let allUserController = async (req, res) => {
  let users = await User.find({}).select("-password");

  return res.status(200).json({
    success: true,
    message: `${users.length} users found`,
    data: users,
  });
};

const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};

let singleUser = async (req, res) => {
  let { id } = req.params;

  let data = await User.findById({ _id: id }).select("-password");

  return res.status(200).json({
    success: true,
    message: "User info",
    data: data,
  });
};

let activeUser = async (req, res) => {
  let data = await User.find({ status: "active" });

  return res.status(200).json({
    success: true,
    message: "Active user info",
    data: data,
  });
};

let deactiveUser = async (req, res) => {
  let data = await User.find({ status: "deactive" });

  return res.status(200).json({
    success: true,
    message: "Deactive user info",
    data: data,
  });
};

let updateUser = async (req, res) => {
  let { id } = req.params;
  await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });

  return res.status(200).json({
    success: true,
    message: "User Updated",
  });
};

const deleteCategory = async (req, res) => {
  try {
    let { id } = req.params;

    const deletedCategory = await Categories.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

module.exports = {
  allUserController,
  deleteUserController,
  deleteCategory,
  singleUser,
  deactiveUser,
  activeUser,
  updateUser,
};
