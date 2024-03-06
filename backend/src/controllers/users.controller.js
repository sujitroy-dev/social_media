import pool from "../config/database.js";
import { comparePassword, hashPassword } from "../utils";
import jwt from "jsonwebtoken";
import generateTokens from "../utils";

// Get all users
export const getAllUsers = async (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 10;
  const offset = (page - 1) * count;

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const GET_USER_QUERY = `SELECT user_id, username, email, created_at, updated_at
    FROM user
    LIMIT ?
    OFFSET ?`;
    const GET_USER_COUNT = `SELECT COUNT(*) AS totalCount FROM user`;

    const [users, totalCountResult] = await Promise.all([
      connection.query(GET_USER_QUERY, [count, offset]),
      connection.query(GET_USER_COUNT),
    ]);

    connection.commit();

    const resultCount = users[0].length;
    const totalCount = totalCountResult[0][0].totalCount;

    res.status(200).json({
      users: users[0],
      resultCount,
      totalCount,
    });
  } catch (err) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Get user by id
export const getUserById = async (req, res) => {
  const id = req.params.id;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [rows] = await connection.query(
      `SELECT user_id, first_name, last_name, username, email, created_at, updated_at  FROM user WHERE id = ?`,
      id
    );

    await connection.commit();

    if (Array.isArray(rows) && rows.length > 0) {
      res.status(200).json(rows?.[0]);
      return;
    }
    res.status(404).json({ message: "Not Found" });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Update user by id
export const udpateUserById = async (req, res) => {
  const id = req.user.id;
  const { username, email, password, first_name, last_name } = req.body;
  let connection;
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
    connection = await pool.getConnection();
    connection.beginTransaction();

    const query = `UPDATE user SET ? WHERE user_id = ?`;
    const [rows] = await connection.query(query, [updateUser, id]);

    connection.commit();

    if (rows.affectedRows === 1) {
      delete updateUser.password;
      return res.send({ ...updateUser, message: "Updated successfully" });
    }
    throw Error({ message: "Failed to update" });
  } catch (error) {
    if (connection) {
      connection.rollback();
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Register new user
export const registerUser = async (req, res) => {
  let { first_name, last_name, username, email, password } = req.body;
  password = await hashPassword(password);
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const query = `INSERT INTO user (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)`;
    const result = await connection.query(query, [
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
    if (connection) {
      connection.rollback();
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const login = async (req, res) => {
  const { identifier, password } = req.body;
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const SEARCH_QUERY = `SELECT user_id, username, email, password as hashPassword
    FROM user
    WHERE email = ? OR username = ?`;
    const [row] = await connection.query(SEARCH_QUERY, [
      identifier,
      identifier,
    ]);

    const { hashPassword } = row?.[0];

    const isPasswordValid = await comparePassword(password, hashPassword);

    if (!isPasswordValid) {
      return res.send({ message: "Invalid email or password" });
    }
    const userDetails = row[0];

    await delete userDetails.hashPassword;

    const { accessToken, refreshToken } = await generateTokens(userDetails);
    await connection.commit();

    res.cookie("accessToken", accessToken, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false, // Set to true if your app is served over HTTPS
    });
    res.status(200).json({
      messgae: "Logged-in successfully",
      email: userDetails.email,
      username: userDetails.username,
      profilePicture: userDetails.profilePicture,
      accessToken,
      refreshToken,
    });
    return;
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

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    // Verify refresh token
    const { user_id, username, email } = await jwt.verify(
      refreshToken,
      JWT_SECRET
    );

    // Generate new access token
    const accessToken = await jwt.sign(
      { user_id, username, email },
      JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};
