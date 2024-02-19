import express from "express";
const router = express.Router();
import {
  registerUser,
  login,
  getAllUsers,
  getUserById,
  udpateUserById,
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
 *     summary: Get all users with pagination
 *     description: Get all users with pagination
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
 *     summary: Get user by id
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

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [Users]
 *     summary: Register a new user
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 first_name:
 *                   type: string
 *                   example: Elon
 *                 last_name:
 *                   type: string
 *                   example: Mask
 *                 username:
 *                   type: string
 *                   example: elonmask
 *                 email:
 *                   type: string
 *                   example: elonmask@spacex.com
 *                 password:
 *                   type: string
 *                   example: test-password
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 first_name:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /users/update/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update user details by id
 *     description: Update user details by id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Users unique id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 first_name:
 *                   type: string
 *                   example: Elon-udpate
 *                 last_name:
 *                   type: string
 *                   example: Mask-udpate
 *                 username:
 *                   type: string
 *                   example: elonmask-udpate
 *                 email:
 *                   type: string
 *                   example: update.elonmask@spacex.com
 *                 password:
 *                   type: string
 *                   example: test-password-udpate
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Updated successfully
 *                 first_name:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/update/:id", udpateUserById);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Login with emai/username and password
 *     description: Login with emai/username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - identifier
 *             properties:
 *               identifier:
 *                 type: string
 *                 example: elonmask
 *               password:
 *                 type: string
 *                 example: test-password
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged-in successfully
 *                 token:
 *                   type: string
 *                 email:
 *                   type: string
 *                 username:
 *                   type: string
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/login", login);

export default router;
