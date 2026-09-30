const express = require("express");
const {
  vendorController,
  createCategory,
  getAllCategory,
} = require("../controllers/vendorController");
const router = express.Router();

router.post("/create/product", vendorController);
router.post("/create/category", createCategory);
router.get("/all/category", getAllCategory);

module.exports = router;
