import pool from "../config/database.js";
import { hashPassword } from "../helper/authHelper.js";

// Get all users
export const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const count = parseInt(req.query.count) || 10;
  const offset = (page - 1) * count;

  try {
    const [users, totalCountResult] = await Promise.all([
      pool.query(
        `SELECT id, username, email, created_at, updated_at
        FROM user
        LIMIT ?
        OFFSET ?`,
        [count, offset]
      ),
      pool.query(`SELECT COUNT(*) AS totalCount
      FROM user`),
    ]);

    const totalCount = totalCountResult[0].totalCount;

    res.status(200).json({
      users: users[0],
      resultCount: users[0].length,
      totalCount: totalCountResult[0][0].totalCount,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user by id
export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [rows] = await pool.query(`SELECT * FROM user WHERE id = ?`, id);

    if (Array.isArray(rows) && rows.length > 0) {
      res.status(200).json(rows?.[0]);
      return;
    }
    res.status(404).json({ message: "Not Found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create new user
export const createUser = async (req, res) => {
  let { first_name, last_name, username, email, password } = req.body;
  password = await hashPassword(password);

  const query = `INSERT INTO user (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)`;

  try {
    const result = await pool.query(query, [
      first_name,
      last_name,
      username,
      email,
      password,
    ]);
    res.send(
      {
        id: result?.[0].insertId,
        first_name,
        last_name,
        username,
        email,
      } || "failed"
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update user by id
export const udpateUserById = async (req, res) => {
  const id = req.params.id;
  const { username, email, password, first_name, last_name } = req.body;
  const updateUser = {};

  if (password) {
    updateUser.password = await hashPassword(password);
  }
  if (username) {
    updateUser.username = username;
  }
  if (email) {
    updateUser.email = email;
  }
  if (first_name) {
    updateUser.first_name = first_name;
  }
  if (last_name) {
    updateUser.last_name = last_name;
  }

  try {
    const query = `UPDATE user SET ? WHERE id = ?`;
    const [rows] = await pool.query(query, [updateUser, id]);

    if (rows.affectedRows === 1) {
      delete updateUser.password;
      return res.send(updateUser);
    }
    throw Error({ message: "Failed to update" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
