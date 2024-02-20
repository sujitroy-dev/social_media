import pool from "../config/database.js";

export const getPetsByUser = async (req, res) => {
  try {
    const user_id = parseInt(req.params.id);
    const [rows] = await pool.query(
      `SELECT *
      FROM pet
      WHERE user_id = ?`,
      user_id
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPetById = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createPet = async (req, res) => {
  let { user_id, name, breed, type, dob, about } = req.body;

  const INSERT_QUERY = `INSERT INTO pet (user_id, name, breed, type, dob, about)
  VALUES (?, ?, ?, ?, ?, ?)`;

  try {
    const response = await pool.query(INSERT_QUERY, [
      user_id,
      name,
      breed,
      type,
      dob,
      about,
    ]);

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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updatePet = async (req, res) => {
  let { id, user_id, name, breed, type, dob, about } = req.body;
  const petID = req.params.id;
  const newDate = { id, user_id, name, breed, type, dob, about };

  const UDPATE_QUERY = `UPDATE pet SET ? WHERE id = ?`;

  try {
    const response = await pool.query(UDPATE_QUERY, [newDate, petID]);

    if (response?.[0].affectedRows > 0) {
      return res.status(201).json({
        message: "Updated successfully",
        updatedData: newDate,
      });
    }
    return res.json({ message: "Missing or invalid parameters" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deletePet = async (req, res) => {
  try {
    const petID = parseInt(req.params.id);
    const DELETE_QUERY = `DELETE FROM pet WHERE id = ?`;

    const [response] = await pool.query(DELETE_QUERY, petID);

    if (response.affectedRows > 0) {
      return res.status(200).send({ message: "Removed successfully" });
    }
    return res.send({ message: "Failed to update, Invalid id" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
