import pool from "../config/database.js";

export const viewAllComments = async (req, res) => {
  const postID = req.query.postID;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const GET_POST_COMMENTS_QUERY = `
    SELECT
      c.comment_id,
      c.content,
      JSON_OBJECT(
          'user_id', c.user_id,
          'username', u.username,
          'full_name', CONCAT(u.first_name, ' ', u.last_name)
          ) as user_details,
          c.created_at,
          c.updated_at
    FROM comment AS c
    LEFT JOIN user AS u ON u.id = c.user_id
    WHERE c.post_id = ? AND c.parent_comment_id IS NULL
    `;
    const [rows] = await connection.query(GET_POST_COMMENTS_QUERY, postID);

    res.status(200).json(rows);
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
export const newComment = async (req, res) => {
  const { post_id, content } = req.body;
  const newCommentData = { user_id: req.user.id, post_id, content };
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const NEW_COMMENT_QUERY = `
    INSERT INTO comment SET ?
    `;

    const [response] = await connection.query(
      NEW_COMMENT_QUERY,
      newCommentData
    );
    await connection.commit();
    if (response.affectedRows > 0) {
      res
        .status(200)
        .json({ comment_id: response.insertId, ...newCommentData });
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
export const updateComment = async (req, res) => {
  const { content } = req.body;
  const updateData = { content };
  const commentID = req.params.id;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const UPDATE_COMMENT_QUERY = `
    UPDATE comment SET ? WHERE comment_id = ?
    `;
    const [response] = await connection.query(UPDATE_COMMENT_QUERY, [
      updateData,
      commentID,
    ]);

    if (response.affectedRows > 0) {
      res.status(201).json({ message: "Updated successfully" });
    }

    await connection.commit();
    res.status(400).json({ message: "Failed to update, Invalid Comment ID" });
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
export const deleteComment = async (req, res) => {
  const commentID = req.params.id;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const DELETE_COMMENT_QUERY = `
    DELETE FROM comment WHERE comment_id = ?
    `;
    const [response] = await connection.query(DELETE_COMMENT_QUERY, commentID);

    if (response.affectedRows > 0) {
      res.status(201).json({ message: "Deleted successfully" });
      return;
    }
    res.status(400).json({ message: "Failed to update, Invalid Comment ID" });
  } catch (error) {
    if (connection) {
      connection.rollback();
    }
    res.status(400).json({ message: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
