const express = require("express");
const {
  allUserController,
  singleUser,
  activeUser,
  deactiveUser,
  updateUser,
} = require("../controllers/adminController");
const router = express.Router();

router.get("/all-user", allUserController);
router.get("/user/:id", singleUser);
router.get("/active/user", activeUser);
router.get("/deactive/user", deactiveUser);
router.post("/delete/user");
router.post("/update/user/:id", updateUser);

module.exports = router;
