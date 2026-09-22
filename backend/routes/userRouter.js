const express = require("express");
const {
  userController,
  createCategory,
  getAllCategory,
} = require("../controllers/userController");
const router = express.Router();

router.get("/product", userController);
router.post("/create/category", createCategory);
router.get("/all/category", getAllCategory);

module.exports = router;
