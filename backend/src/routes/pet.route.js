import express from "express";
import {
  createPet,
  getPetsByUser,
  updatePet,
} from "../controllers/pet.controller.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - user_id
 *         - name
 *         - breed
 *         - type
 *         - dob
 *       properties:
 *         id:
 *           type: integer
 *           description: auto generated pet id
 *           example: 1
 *         user_id:
 *           type: integer
 *           description: parent user id
 *           example: 1
 *         name:
 *           type: string
 *           description: Full name of the pet
 *           example: simba
 *         breed:
 *           type: string
 *           description: Breed name of the pet
 *           example: persian
 *         type:
 *           type: string
 *           description: Type of the pet
 *           example: cat
 *         dob:
 *           type: date
 *           description: DOB of the pet
 *           example: 2021-04-21
 *         about:
 *           type: string
 *           description: All about the pet
 *           example: Simba enjoys lounging in the sun and cuddling up with his favorite toy
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
 *   name: Pets
 *   description: The pets managing API
 */

/**
 * @swagger
 * /pet/create:
 *   post:
 *     tags: [Pets]
 *     summary: Create a new pet.
 *     description: Creates a new pet record in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: parent user id
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: Full name of the pet
 *                 example: simba
 *               breed:
 *                 type: string
 *                 description: Breed name of the pet
 *                 example: persian
 *               type:
 *                 type: string
 *                 description: Type of the pet
 *                 example: cat
 *               dob:
 *                 type: date
 *                 description: DOB of the pet
 *                 example: 2021-04-21
 *               about:
 *                 type: string
 *                 description: All about the pet
 *                 example: Simba enjoys lounging in the sun and cuddling up with his favorite toy
 *     responses:
 *       '200':
 *         description: Successfully created a new pet.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       '400':
 *         description: Bad request. Missing or invalid parameters.
 *       '500':
 *         description: Internal server error. Failed to create a pet.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.post("/create", createPet);

/**
 * @swagger
 * /pet/update/{id}:
 *   patch:
 *     tags: [Pets]
 *     summary: Update pet details by id
 *     description: Update pet details by id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Pets unique id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 breed:
 *                   type: string
 *                 type:
 *                   type: string
 *                 dob:
 *                   type: string
 *                 about:
 *                   type: string
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
 *                 updatedData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     user_id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     breed:
 *                       type: string
 *                     type:
 *                       type: string
 *                     dob:
 *                       type: string
 *                     about:
 *                       type: string
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.patch("/update/:id", updatePet);

router.get("/view-all/:id", getPetsByUser);

export default router;
