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
  updateProduct,
} = require("../controllers/productController");
const upload = require("../utils/imageStorage");
const router = express.Router();

// Category and sub category
/**
 * @swagger
 * tags:
 *   - name: Vendor
 *     description: Vendor category and subcategory routes
 *   - name: Product
 *     description: Product management routes
 */

/**
 * @swagger
 * /api/v1/vendor/create/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Vendor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 */
router.post("/create/category", createCategory);

/**
 * @swagger
 * /api/v1/vendor/all/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Vendor]
 *     responses:
 *       200:
 *         description: fetched all category
 */
router.get("/all/category", getAllCategory);

/**
 * @swagger
 * /api/v1/vendor/create/sub-category:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [Vendor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *                 description: ID of the parent category
 *     responses:
 *       201:
 *         description: Subcategory created
 */
router.post("/create/sub-category", createSubCategory);

/**
 * @swagger
 * /api/v1/vendor/all/sub-category:
 *   get:
 *     summary: Get all subcategories
 *     tags: [Vendor]
 *     responses:
 *       200:
 *         description: fetched all Subcategory
 */
router.get("/all/sub-category", getAllSubCategory);

/**
 * @swagger
 * /api/v1/vendor/all/category/{id}/sub-category:
 *   get:
 *     summary: Get subcategories by category ID
 *     tags: [Vendor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/all/category/:id/sub-category", getAllCategoryWiseSubCategory);

/**
 * @swagger
 * /api/v1/vendor/all/user/{id}/category:
 *   get:
 *     summary: Get categories by owner/user ID
 *     tags: [Vendor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/all/user/:id/category", getAllOwnerWiseSubCategory);

// Product
/**
 * @swagger
 * /api/v1/vendor/create/product:
 *   post:
 *     summary: Create a new product with images
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload up to 5 images
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 */
router.post("/create/product", upload.array("image"), createProduct);

/**
 * @swagger
 * /api/v1/vendor/all/product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: fetched all products
 */
router.get("/all/product", allProducts);

/**
 * @swagger
 * /api/v1/vendor/product/delete/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.delete("/product/delete/:id", deleteProduct);

/**
 * @swagger
 * /api/v1/vendor/product/category/{id}:
 *   get:
 *     summary: Get products by category ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/product/category/:id", categoryWiseProduct);

/**
 * @swagger
 * /api/v1/vendor/product/subcategory/{id}:
 *   get:
 *     summary: Get products by subcategory ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/product/subcategory/:id", subCategoryWiseProduct);

/**
 * @swagger
 * /api/v1/vendor/product/owner/{id}:
 *   get:
 *     summary: Get products by owner ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/product/owner/:id", ownerWiseProduct);

/**
 * @swagger
 * /api/v1/vendor/bulk/product:
 *   post:
 *     summary: Bulk upload products via CSV/Excel file
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Upload the bulk product file
 *     responses:
 *       200:
 *         description: Bulk uploaded
 */
router.post("/bulk/product", upload.single("file"), bulkProductUpload);

/**
 * @swagger
 * /api/v1/vendor/update/product/{id}:
 *   post:
 *     summary: Update an existing product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload new photos (if any)
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated
 */
router.post("/update/product/:id", upload.array("photo"), updateProduct);

module.exports = router;
