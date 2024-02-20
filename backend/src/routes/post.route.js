import express from "express";
import { newPost } from "../controllers/post.controller.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - pet_id
 *       properties:
 *         id:
 *           type: integer
 *           description: auto generated post id
 *           example: 1
 *         pet_id:
 *           type: integer
 *           description: parent pet id
 *           example: 1
 *         title:
 *           type: string
 *           description: post title
 *           example: My new pet
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
 * /post/create:
 *   post:
 *     tags: [Post]
 *     summary: Create a new post.
 *     description: Creates a new post.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pet_id:
 *                 type: integer
 *                 description: parent pet id
 *                 example: 1
 *               title:
 *                 type: string
 *                 description: Post title
 *                 example: My new pet
 *     responses:
 *       '200':
 *         description: Successfully created a new post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Bad request. Missing or invalid parameters.
 *       '500':
 *         description: Internal server error. Failed to create a post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.post("/create", newPost);

export default router;
