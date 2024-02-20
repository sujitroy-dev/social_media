import pool from "../config/database.js";

export const newPost = async (req, res) => {
  try {
    const { pet_id, title, data } = req.body;
    const CREATE_NEW_POST_QUERY = `INSERT INTO post (pet_id, title)
    VALUES (?, ?)`;

    const [CREATE_POST_RESPONSE] = await pool.query(CREATE_NEW_POST_QUERY, [
      pet_id,
      title,
    ]);
    if (CREATE_POST_RESPONSE.affectedRows == 0) {
      return res.json({ message: "Failed to upload" });
    }

    let assets = [];
    if (data.length > 0) {
      const postID = CREATE_POST_RESPONSE.insertId;
      const ADD_POST_ASSETS_QUERY = `INSERT INTO post_asset
      (post_id, url, type)
      VALUES ?`;

      const values = await data.map((post) => [postID, post.url, post.type]);
      await pool.query(ADD_POST_ASSETS_QUERY, [values]);

      const [rows] = await pool.query(
        `SELECT id, url, type  FROM post_asset WHERE post_id = ?`,
        postID
      );
      assets = rows;
    }
    return res.status(201).json({
      message: "Post uploaded",
      data: { id: CREATE_POST_RESPONSE.insertId, pet_id, title, assets },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
