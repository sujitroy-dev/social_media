import pool from "../config/database.js";

export const newPost = async (req, res) => {
  const { pet_id, content, data } = req.body;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // check pet id valid or not
    const GET_USER_ID_QUERY = `
    SELECT user_id FROM user
    WHERE user_id = ?
    `;

    let [GET_USER_ID_RESPONSE] = await connection.query(
      GET_USER_ID_QUERY,
      user_id
    );
    GET_USER_ID_RESPONSE = GET_USER_ID_RESPONSE?.[0];

    if (!GET_USER_ID_RESPONSE) {
      res.status(403).json({ message: "Invalid user_id" });
      return;
    }
    if (GET_USER_ID_RESPONSE.user_id !== req.user.id) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    const CREATE_NEW_POST_QUERY = `INSERT INTO post (user_id, content)
    VALUES (?, ?)`;

    const [CREATE_POST_RESPONSE] = await connection.query(
      CREATE_NEW_POST_QUERY,
      [pet_id, content]
    );
    if (CREATE_POST_RESPONSE.affectedRows == 0) {
      return res.json({ message: "Failed to upload" });
    }

    let assets = [];
    if (data?.length > 0) {
      const postID = CREATE_POST_RESPONSE.insertId;
      const ADD_POST_ASSETS_QUERY = `INSERT INTO post_asset
      (post_id, url, type)
      VALUES ?`;

      const values = await data.map((post) => [postID, post.url, post.type]);
      await connection.query(ADD_POST_ASSETS_QUERY, [values]);

      const [rows] = await connection.query(
        `SELECT post_asset_id, url, type  FROM post_asset WHERE post_id = ?`,
        postID
      );
      assets = rows;
    }
    await connection.commit();
    return res.status(201).json({
      message: "Post uploaded",
      data: {
        post_id: CREATE_POST_RESPONSE.insertId,
        user_id,
        content,
        assets,
      },
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const updatePost = async (req, res) => {
  const { content } = req.body;
  const postID = req.params.id;
  const updateData = { content };
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const GET_USER_ID_QUERY = `SELECT user_id FROM post WHERE post_id = ?`;
    let [userResponse] = await connection.query(GET_USER_ID_QUERY, postID);
    userResponse = userResponse[0];

    if (userResponse.length === 0) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    if (userResponse.user_id !== req.user.id) {
      res.status(403).json({
        message: "Forbidden: You are not allowed to update this post",
      });
      return;
    }

    const UPDATE_POST_QUERY = `UPDATE post SET ? WHERE post_id = ?`;
    const [response] = await connection.query(UPDATE_POST_QUERY, [
      updateData,
      postID,
    ]);
    await connection.commit();

    if (response.affectedRows > 0) {
      res.status(201).json({ message: "Updated successfully" });
    }

    res.status(400).json({ message: "Failed to update" });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
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
      p.post_id,
      p.user_id,
      CONCAT(u.first_name, ' ', u.last_name) AS full_name,
      u.username,
      u.profile_picture AS pet_profile_pic,
      p.content,
      JSON_ARRAYAGG(pa.url) AS asset_urls,
      p.created_at,
      p.updated_at
    FROM post p
      LEFT JOIN post_asset pa ON pa.post_id = p.id
      LEFT JOIN user AS u ON u.user_id = p.post_id
    WHERE p.id = ?`;

    const [result] = await connection.query(GET_POST_QUERY, postID);
    await connection.commit();

    if (Array.isArray(result) && result.length > 0) res.send(result[0]);
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const getFeedPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const count = parseInt(req.query.count) || 6;
  const offset = (page - 1) * count;

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const GET_POSTS_QUERY = `
    SELECT 
      p.post_id, p.user_id, p.content,
      CONCAT(u.first_name, ' ', u.last_name) AS full_name,
      u.username,
      u.profile_picture,
      COALESCE(JSON_ARRAYAGG(JSON_OBJECT('id', pa.post_asset_id, 'url', pa.url)), JSON_ARRAY()) AS asset_urls,
      p.created_at
    FROM post as p
    LEFT JOIN post_asset AS pa
    ON  p.id = pa.post_id
    LEFT JOIN user AS u
    ON u.user_id = p.user_id
    GROUP BY p.post_id, p.content, p.created_at
    ORDER BY p.post_id DESC
    LIMIT ?
    OFFSET ?
    `;
    const GET_POST_COUNT_QUERY = `
    SELECT COUNT(*) as count FROM post
    `;

    const [postRows] = await connection.query(GET_POSTS_QUERY, [count, offset]);
    const [totalPostCount] = await connection.query(GET_POST_COUNT_QUERY);

    await connection.commit();

    res.send({
      data: postRows,
      resultCount: postRows.length,
      totalPostCount: totalPostCount[0].count,
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // check pet id valid or not
    const GET_USER_ID_QUERY = `
    SELECT u.user_id FROM post AS p
    LEFT JOIN user AS u ON u.user_id = p.user_id
    WHERE p.post_id = ?
    `;

    let [GET_USER_ID_RESPONSE] = await connection.query(
      GET_USER_ID_QUERY,
      postId
    );
    GET_USER_ID_RESPONSE = GET_USER_ID_RESPONSE?.[0];

    if (!GET_USER_ID_RESPONSE) {
      res.status(403).json({ message: "Invalid pet_id" });
      return;
    }
    if (GET_USER_ID_RESPONSE.user_id !== req.user?.id) {
      console.error({ token: req.user.id, db: GET_USER_ID_RESPONSE.user_id });
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const DELETE_POST_ASSET_QUERY = `DELETE FROM post_asset WHERE post_id = ?`;
    const DELETE_POST_QUERY = `DELETE FROM post WHERE id = ?`;

    await connection.query(DELETE_POST_ASSET_QUERY, postId);
    await connection.query(DELETE_POST_QUERY, postId);

    await connection.commit();
    res.send({ message: "Deleted successfully" });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const deletePostAsset = async (req, res) => {
  const assetId = req.params.assetId;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const DELETE_ASSET_QUERY = `DELETE FROM post_asset WHERE post_asset_id = ?`;
    const [response] = await connection.query(DELETE_ASSET_QUERY, assetId);
    await connection.commit();

    if (response.affectedRows) {
      res.status(202).send({ message: "Deleted successfully" });
    }

    res.status(404).send({ message: "Invalid ID" });
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
