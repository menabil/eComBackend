let User = require("../models/userSchema");

let allUserController = async (req, res) => {
  let users = await User.find({}).select("-password");

  return res.status(200).json({
    success: true,
    message: `${users.length} users found`,
    data: users,
  });
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

module.exports = {
  allUserController,
  singleUser,
  activeUser,
  deactiveUser,
  updateUser,
};
