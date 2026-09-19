let User = require("../models/userSchema");

let allUserController = async (req, res) => {
  let users = await User.find({}).select("-password")

  return res.status(200).json({
    success: true,
    message: `${users.length} users found`,
    data: users,
  });
};

module.exports = { allUserController };
