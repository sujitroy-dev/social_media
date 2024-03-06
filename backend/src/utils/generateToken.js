import pool from "../config/database.js";
import jwt from "jsonwebtoken";

export const generateTokens = async (user) => {
  const { user_id, username, email } = user;
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const payload = { user_id, username, email };
    const accessToken = await jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: "14m",
    });

    const refreshToken = await jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: "28d",
    });

    const [userToken] = await connection.query(
      `INSERT INTO token(user_id, refreshToken) VALUES(?,?)`,
      [user_id, refreshToken]
    );

    if (userToken.affectedRows > 0) {
      return Promise.resolve({ accessToken, refreshToken });
    }
    return Promise.reject({ message: "Server issue, Try again!" });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    return Promise.reject(error);
  } finally {
    if (connection) {
      await connection.release();
    }
  }
};
