const express = require("express");
const {
  userController,
  createCategory,
  getAllCategory,
} = require("../controllers/userController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: user panel routes
 */

/**
 * @swagger
 * /api/v1/user/update/profile:
 *   post:
 *     summary: update user profile
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *     responses:
 *       200:
 *         description: success
 */
router.post("/update/profile", userController);

/**
 * @swagger
 * /api/v1/user/create/category:
 *   post:
 *     summary: request a new category
 *     tags: [User]
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
 *         description: success
 */
router.post("/create/category", createCategory);

/**
 * @swagger
 * /api/v1/user/all/category:
 *   get:
 *     summary: get all categories
 *     tags: [User]
 *     responses:
 *       200:
 *         description: success
 */
router.get("/all/category", getAllCategory);

module.exports = router;
