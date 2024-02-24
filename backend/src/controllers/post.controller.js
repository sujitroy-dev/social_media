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

export const updatePost = async (req, res) => {
  let connection;
  try {
    const { title } = req.body;
    const postID = req.params.id;
    const updateData = { title };
    const UPDATE_POST_QUERY = `UPDATE post SET ? WHERE id = ?`;
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [response] = await connection.query(UPDATE_POST_QUERY, [
      updateData,
      postID,
    ]);
    await connection.commit();
    connection.release();

    if (response.affectedRows > 0) {
      res.status(201).json({ message: "Updated successfully" });
    }

    res.status(400).json({ message: "Failed to update" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const getPost = async (req, res) => {
  let connection;
  try {
    const postID = req.params.id;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const GET_POST_QUERY = `SELECT
      p.id AS post_id,
      p.pet_id,
      p.title,
      JSON_ARRAYAGG(pa.url) AS asset_urls,
      pet.name AS pet_name,
      pet.profile_picture AS pet_profile_pic,
      p.created_at,
      p.updated_at
    FROM post p
      LEFT JOIN post_asset pa ON pa.post_id = p.id
      LEFT JOIN pet ON pet.id = p.pet_id
    WHERE p.id = ?`;

    const [result] = await connection.query(GET_POST_QUERY, postID);

    console.log(result);

    if (Array.isArray(result) && result.length > 0) res.send(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const DELETE_POST_QUERY = `DELETE FROM post WHERE id = ?`;
  const DELETE_POST_ASSET_QUERY = `DELETE FROM post_asset WHERE post_id = ?`;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const deletePostRes = await connection.query(DELETE_POST_QUERY, postId);
    const deleteAssetRes = await connection.query(
      DELETE_POST_ASSET_QUERY,
      postId
    );

    console.log({ deletePostRes, deleteAssetRes });
    res.send({ deletePostRes, deleteAssetRes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
