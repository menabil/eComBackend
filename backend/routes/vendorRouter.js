const express = require("express");
const {
  createCategory,
  getAllCategory,
  createSubCategory,
  getAllSubCategory,
  getAllCategoryWiseSubCategory,
  getAllOwnerWiseSubCategory,
} = require("../controllers/vendorController");
const {
  allProducts,
  createProduct,
  deleteProduct,
  categoryWiseProduct,
  subCategoryWiseProduct,
  ownerWiseProduct,
  bulkProductUpload,
} = require("../controllers/productController");
const router = express.Router();

// Category and sub category
router.post("/create/category", createCategory);
router.get("/all/category", getAllCategory);
router.post("/create/sub-category", createSubCategory);
router.get("/all/sub-category", getAllSubCategory);
router.get("/all/sub-category", getAllSubCategory);
router.get("/all/category/:id/sub-category", getAllCategoryWiseSubCategory);
router.get("/all/user/:id/category", getAllOwnerWiseSubCategory);

// Product
router.post("/create/product", upload.array("image"), createProduct);
router.get("/all/product", allProducts);
router.delete("/product/delete/:id", deleteProduct);
router.get("/product/category/:id", categoryWiseProduct);
router.get("/product/subcategory/:id", subCategoryWiseProduct);
router.get("/product/owner/:id", ownerWiseProduct);
router.post("/bulk/product", upload.single("file"), bulkProductUpload);

module.exports = router;
