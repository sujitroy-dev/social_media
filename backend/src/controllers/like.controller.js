import pool from "../config/database.js";

export const newLike = async (req, res) => {
  const { post_id } = req.body;
  const { user_id } = req.user;
  const like = { post_id, user_id };

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const GET_POST_QUERY = `SELECT post_id FROM post WHERE id = ?`;
    let [GET_POST_RESPONSE] = await connection.query(GET_POST_QUERY, post_id);
    GET_POST_RESPONSE = GET_POST_RESPONSE?.[0];

    if (!GET_POST_RESPONSE) {
      res.status(404).json({ message: "Invalid post_id" });
      return;
    }

    const NEW_LIKE_QUERY = `INSERT INTO like SET ?`;

    const [response] = await connection.query(NEW_LIKE_QUERY, like);
    await connection.commit();

    if (response.affectedRows > 0) {
      res.status(200).json({ like_id: response.insertId });
    }
    res.status(200).json({ message: "Failed" });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    connection.release();
  }
};

export const disLike = async (req, res) => {
  const { user_id } = req.user;
  const { post_id } = req.body;

  let connection;
  try {
    connection = await pool.getConnection();
    await pool.beginTransaction();

    const DELETE_LIKE_QUERY = `DELETE FROM like WHERE user_id = ? AND post_id = ?`;
    const [DELETE_LIKE_RESPONSE] = await connection.query(DELETE_LIKE_QUERY, [
      user_id,
      post_id,
    ]);
    await connection.commit();

    if (DELETE_LIKE_RESPONSE.affectedRows > 0) {
      res.status(200).json({ message: "Success" });
      return;
    }
    res.status(200).json({ message: "Failed, try again" });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
  } finally {
    if (connection) {
      await connection.release();
    }
  }
};
