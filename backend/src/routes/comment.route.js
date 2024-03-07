import express from "express";
import {
  deleteComment,
  newComment,
  updateComment,
  viewAllComments,
} from "../controllers/comment.controller.js";
import { jwtAuthenticate } from "../middleware/index.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - comment_id
 *         - user_id
 *         - post_id
 *         - content
 *       properties:
 *         comment_id:
 *           type: integer
 *           description: auto generated pet id
 *         post_id:
 *           type: integer
 *           description: parent user id
 *         user_id:
 *           type: integer
 *           description: parent user id
 *         content:
 *           type: string
 *           description: Comment text
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
 * tags:
 *   name: Comment
 *   description: The comments managing API
 */

/**
 * @swagger
 * /comment/all:
 *   get:
 *     tags: [Comment]
 *     summary: view all comments of a post.
 *     description: view all comments from record in the database.
 *     parameters:
 *       - name: postID
 *         in: query
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       '200':
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       '500':
 *         description: Internal server error. Failed to comment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */

router.get("/all", viewAllComments);

/**
 * @swagger
 * /comment/new:
 *   post:
 *     tags: [Comment]
 *     summary: Comment on a post.
 *     description: Creates a new comment record in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_id:
 *                 type: integer
 *                 example: 3
 *               content:
 *                 type: string
 *                 example: text content
 *     responses:
 *       '200':
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       '404':
 *         description: Invlid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid post_id
 *       '500':
 *         description: Internal server error. Failed to comment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */

router.post("/new", jwtAuthenticate, newComment);

/**
 * @swagger
 * /comment/update/{id}:
 *   patch:
 *     tags: [Comment]
 *     summary: Update a existing comment.
 *     description: Update comment record in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: unique comment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: new text content
 *     responses:
 *       '200':
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Updated successfully
 *       '400':
 *         description: Failed due to invalid comment ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to update, Invalid Comment ID
 *       '500':
 *         description: Internal server error. Failed to update the comment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.patch("/update/:id", jwtAuthenticate, updateComment);

/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     tags: [Comment]
 *     summary: Delete an existing comment.
 *     description: Remove a comment record from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: unique comment id
 *     responses:
 *       '200':
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deleted successfully
 *       '400':
 *         description: Failed due to invalid comment ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to delete, Invalid Comment ID
 *       '500':
 *         description: Internal server error. Failed to delete the comment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.delete("/:id", jwtAuthenticate, deleteComment);

export default router;
