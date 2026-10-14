const express = require("express");
const {
  createCategory,
  getAllCategory,
  createSubCategory,
  getAllSubCategory,
  getAllCategoryWiseSubCategory,
  getAllOwnerWiseSubCategory,
} = require("../controllers/vendorController");
const { productController } = require("../controllers/productController");
const router = express.Router();

// Category 
router.post("/create/category", createCategory);
router.get("/all/category", getAllCategory);
router.post("/create/sub-category", createSubCategory);
router.get("/all/sub-category", getAllSubCategory);
router.get("/all/sub-category", getAllSubCategory);
router.get("/all/category/:id/sub-category", getAllCategoryWiseSubCategory);
router.get("/all/user/:id/category", getAllOwnerWiseSubCategory);

// Product
router.post("/create/product", productController);

module.exports = router;
