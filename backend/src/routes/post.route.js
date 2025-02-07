import express from "express";
import {
  deletePost,
  deletePostAsset,
  getFeedPosts,
  getPost,
  newPost,
  updatePost,
} from "../controllers/post.controller.js";
import { newLike, disLike } from "../controllers/like.controller.js";

import { jwtAuthenticate } from "../middleware/index.js";
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

/**
 * @swagger
 * /post/update/{id}:
 *   patch:
 *     tags: [Post]
 *     summary: Update post.
 *     description: Update post.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Post unique id
 *         type: integer
 *         example: 10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Post title
 *                 example: This is updated title
 *     responses:
 *       '200':
 *         description: Successfully created a new post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Updated successfully
 *       '400':
 *         description: Bad request. Missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to update
 *       '403':
 *         description: 'Forbidden: You are not allowed to update this post.'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Forbidden: You are not allowed to update this post'
 *       '404':
 *         description: Post not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post not found
 *       '500':
 *         description: Internal server error. Failed to create a post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.patch("/update/:id", updatePost);

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     tags: [Post]
 *     summary: get post and post assets.
 *     description: Get post and post assets.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Post unique id
 *         type: integer
 *         example: 10
 *     responses:
 *       '200':
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type:
 *               properties:
 *                 post_id:
 *                   type: integer
 *                   example: 5
 *                 pet_id:
 *                   type: integer
 *                   example: 2
 *                 title:
 *                   type: string
 *                 asset_urls:
 *                   type: array
 *                   items:
 *                     data: string
 *                 pet_name:
 *                   type: string
 *                 pet_profile_pic:
 *                   type: string
 *                 created_at:
 *                   type: date-time
 *                   description: created_at of the user
 *                   example: 2024-02-17T14:30:00Z
 *                 updated_at:
 *                   type: date-time
 *                   description: updated_at of the user
 *                   example: 2024-02-17T14:30:00Z
 *       '500':
 *         description: Internal server error. Failed to create a post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.get("/:id", getPost);

/**
 * @swagger
 * /post:
 *   get:
 *     tags: [Post]
 *     summary: Get feed posts and post assets with pagination.
 *     description: Get feed posts and post assets with pagination.
 *     parameters:
 *       - in: query
 *         name: count
 *         description: Number of post
 *         type: integer
 *         example: 4
 *       - in: query
 *         name: page
 *         description: Page number
 *         type: integer
 *         example: 1
 *     responses:
 *       '200':
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type:
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     properties:
 *                       post_id:
 *                         type: integer
 *                         example: 5
 *                       pet_id:
 *                         type: integer
 *                         example: 2
 *                       title:
 *                         type: string
 *                       asset_urls:
 *                         type: array
 *                         items:
 *                           data: string
 *                       pet_name:
 *                         type: string
 *                       pet_profile_pic:
 *                         type: string
 *                       created_at:
 *                         type: date-time
 *                         description: post create time
 *                         example: 2024-02-17T14:30:00Z
 *                 resultCount:
 *                   type: integer
 *                   example: 4
 *                 totalPostCount:
 *                   type: integer
 *                   example: 150
 *       '500':
 *         description: Internal server error. Failed to create a post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.get("/", getFeedPosts);

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     tags: [Post]
 *     summary: Delete post and post assets.
 *     description: Delete post and post assets.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Post unique id
 *         type: integer
 *         example: 10
 *     responses:
 *       '200':
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: deleted successfully
 *       '500':
 *         description: Internal server error. Failed to create a post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.delete("/:id", jwtAuthenticate, deletePost);

/**
 * @swagger
 * /post/asset/{id}:
 *   delete:
 *     tags: [Post]
 *     summary: Delete post assets.
 *     description: Delete post assets.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Post_asset unique id
 *         type: integer
 *         example: 10
 *     responses:
 *       '202':
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deleted successfully
 *       '404':
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid ID
 *       '500':
 *         description: Internal server error. Failed to create a post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.delete("/asset/:assetId", deletePostAsset);

router.post("/like", jwtAuthenticate, newLike);

router.delete("/dislike", jwtAuthenticate, disLike);

export default router;
