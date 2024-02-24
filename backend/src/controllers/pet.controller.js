import pool from "../config/database.js";

export const getPetsByUser = async (req, res) => {
  const user_id = req.params.id;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [rows] = await connection.query(
      `SELECT *
      FROM pet
      WHERE user_id = ?`,
      user_id
    );

    await connection.commit();
    res.status(200).json(rows);
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error(error);
    return res.status(500).json({ message: error.message });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const getPetById = async (req, res) => {
  const petID = req.params.id;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const GET_QUERY = `SELECT * FROM pet WHERE id = ?`;
    const [raws] = await connection.query(GET_QUERY, petID);

    await connection.commit();

    Array.isArray(raws) && raws.length > 0 && res.status(200).send(raws[0]);
    return res.send({ message: "Not found" });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error(error);
    return res.status(500).json({ message: error.message });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const createPet = async (req, res) => {
  let { user_id, name, breed, type, dob, about } = req.body;
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const INSERT_QUERY = `INSERT INTO pet (user_id, name, breed, type, dob, about)
    VALUES (?, ?, ?, ?, ?, ?)`;
    const response = await connection.query(INSERT_QUERY, [
      user_id,
      name,
      breed,
      type,
      dob,
      about,
    ]);

    await connection.commit();

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
    if (connection) {
      connection.rollback();
    }
    console.error(error);
    return res.status(500).json({ message: error.message });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const updatePet = async (req, res) => {
  let { id, user_id, name, breed, type, dob, about } = req.body;
  const petID = req.params.id;
  const newDate = { id, user_id, name, breed, type, dob, about };
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const UDPATE_QUERY = `UPDATE pet SET ? WHERE id = ?`;
    const response = await connection.query(UDPATE_QUERY, [newDate, petID]);

    connection.commit();
    if (response?.[0].affectedRows > 0) {
      return res.status(201).json({
        message: "Updated successfully",
        updatedData: newDate,
      });
    }
    return res.json({ message: "Missing or invalid parameters" });
  } catch (error) {
    if (connection) {
      connection.rollback();
    }
    console.error(error);
    return res.status(500).json({ message: error.message });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const deletePet = async (req, res) => {
  const petID = req.params.id;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const DELETE_QUERY = `DELETE FROM pet WHERE id = ?`;
    const [response] = await connection.query(DELETE_QUERY, petID);

    connection.commit();
    if (response.affectedRows > 0) {
      return res.status(200).send({ message: "Removed successfully" });
    }
    return res.send({ message: "Failed to update, Invalid id" });
  } catch (error) {
    if (connection) {
      connection.rollback();
    }
    console.error(error);
    return res.status(500).json({ message: error.message });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
