import express from "express";
const router = express.Router();
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/users.controller.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: auto generated user id
 *           example: 1
 *         first_name:
 *           type: string
 *           description: First name of the user
 *           example: Elon
 *         last_name:
 *           type: string
 *           description: Last name of the user
 *           example: Mask
 *         username:
 *           type: string
 *           description: username of the user
 *           example: elonmask
 *         email:
 *           type: string
 *           description: email id of the user
 *           example: elonmask@spacex.com
 *         password:
 *           type: string
 *           description: password of the user
 *           example: test-password
 *         created_at:
 *           type: date-time
 *           description: created_at of the user
 *           example: 2024-02-17T14:30:00Z
 *         updated_at:
 *           type: date-time
 *           description: updated_at of the user
 *           example: 2024-02-17T14:30:00Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Internal Server Error
 *           description: Error message
 *       required:
 *         - message
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

// Routes
/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     description: Get all users
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - name: count
 *         in: query
 *         description: Response count number for pagination
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     description: Get user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Get user details by id
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", getUserById);
router.post("/create", createUser);
// router.patch("/update/:id", userController.updateUser);

export default router;
