const express = require("express");
const {
  vendorController,
  createCategory,
  getAllCategory,
  createSubCategory,
  getAllSubCategory,
  getAllCategoryWiseSubCategory,
  getAllOwnerWiseSubCategory,
} = require("../controllers/vendorController");
const router = express.Router();

router.post("/create/category", createCategory);
router.get("/all/category", getAllCategory);
router.post("/create/sub-category", createSubCategory);
router.get("/all/sub-category", getAllSubCategory);
router.get("/all/sub-category", getAllSubCategory);
router.get("/all/category/:id/sub-category", getAllCategoryWiseSubCategory);
router.get("/all/user/:id/category", getAllOwnerWiseSubCategory);

module.exports = router;
