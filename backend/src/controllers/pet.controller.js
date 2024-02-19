import pool from "../config/database.js";

export const getPetsByUser = async (req, res) => {};

export const getPetById = async (req, res) => {};

export const createPet = async (req, res) => {
  let { user_id, name, breed, type, dob, about } = req.body;

  const INSERT_QUERY = `INSERT INTO pet (user_id, name, breed, type, dob, about)
  VALUES (?, ?, ?, ?, ?, ?)`;

  const response = await pool.query(INSERT_QUERY, [
    user_id,
    name,
    breed,
    type,
    dob,
    about,
  ]);

  console.log(response?.[0].affectedRows);

  if (response?.[0].affectedRows > 0) {
    return res.status(201).json({
      id: response?.[0].insertId,
      user_id,
      name,
      breed,
      type,
      dob,
      about,
    });
  }
  return res.json({ message: "Missing or invalid parameters" });
};

export const updatePet = async (req, res) => {};

export const deletePet = async (req, res) => {};
