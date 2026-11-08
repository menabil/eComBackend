const express = require("express");
const {
  allUser,
  singleUser,
  activeUser,
  deactiveUser,
  updateUser,
  deleteUser,
  categoryUpdate,
  deleteCategory,
} = require("../controllers/adminController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: admin control routes
 */

/**
 * @swagger
 * /api/v1/admin/all-user:
 *   get:
 *     summary: get all users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: success
 */
router.get("/all-user", allUser);

/**
 * @swagger
 * /api/v1/admin/user/{id}:
 *   get:
 *     summary: get single user
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: success
 */
router.get("/user/:id", singleUser);

/**
 * @swagger
 * /api/v1/admin/active/user:
 *   get:
 *     summary: get all active users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: success
 */
router.get("/active/user", activeUser);

/**
 * @swagger
 * /api/v1/admin/deactive/user:
 *   get:
 *     summary: get all deactive users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: success
 */
router.get("/deactive/user", deactiveUser);

/**
 * @swagger
 * /api/v1/admin/delete/user/{id}:
 *   delete:
 *     summary: delete a user
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: success
 */
router.post("/delete/user/:id", deleteUser);

/**
 * @swagger
 * /api/v1/admin/update/user/{id}:
 *   post:
 *     summary: update a user
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: success
 */
router.post("/update/user/:id", updateUser);

/**
 * @swagger
 * /api/v1/admin/update/category/{id}:
 *   post:
 *     summary: update a category
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: success
 */
router.post("/update/category/:id", categoryUpdate);

/**
 * @swagger
 * /api/v1/admin/delete/category/{id}:
 *   delete:
 *     summary: delete a category
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: success
 */
router.delete("/delete/category/:id", deleteCategory);

/**
 * @swagger
 * /api/v1/admin/category-status/{id}:
 *   patch:
 *     summary: update category status
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the category
 *     responses:
 *       200:
 *         description: success
 */
router.patch("/category-status/:id", categoryStatus);

module.exports = router;
