import jwt from "jsonwebtoken";
import pool from "../config/database.js";

export const authEmail = async (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const GET_USER_QUERY = `SELECT email FROM user WHERE email = ? OR username = ?`;
    let [GET_USER_RESPONSE] = await connection.query(GET_USER_QUERY, [
      email,
      username,
    ]);
    GET_USER_RESPONSE = GET_USER_RESPONSE[0];

    if (GET_USER_RESPONSE) {
      return res.status(409).json({
        success: false,
        message: "Invalid credentials",
        error:
          email === GET_USER_RESPONSE.email
            ? "Duplicate email"
            : "Duplicate username",
      });
    }

    const INSERT_USER_QUERY = `INSERT INTO user
    (first_name, last_name, username, email, password, provider)
    VALUES(?, ?, ?, ?, ?, "email")`;
    let INSERT_USER_RESPONSE = await connection.query(INSERT_USER_QUERY, [
      first_name,
      last_name,
      username,
      email,
      password,
    ]);
    INSERT_USER_RESPONSE = INSERT_USER_RESPONSE[0];
    await connection.commit();

    if (INSERT_USER_RESPONSE.affectedRows) {
      res.status(201).json({
        success: true,
        user: {
          id: INSERT_USER_RESPONSE.insertId,
          first_name,
          last_name,
          username,
          email,
          provider,
        },
      });
      return;
    }

    throw new Error({ message: "Database error" });
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

  // if credentials are valid return token(28d)
  // else return error
};

export const googleRedirect = async (req, res) => {
  let user = {
    first_name: req?.user.name.givenName,
    last_name: req?.user.name.familyName,
    email: req?.user._json.email,
    profile: req?.user._json.picture,
    provider: req?.user.provider,
    accessToken: req?.user.accessToken,
  };
  console.log(user);

  // TODO:
  //1. find user with same email
  //2. if found return token(28d)
  //3. if not found save user details then return token(28d)

  let token = jwt.sign(user, "jwt secret here", { expiresIn: "28d" }); // expiry in seconds
  res.cookie("token", token);
  res.redirect(process.env.CLIENT_ORIGIN_URL);
};

export const githubRedirect = async (req, res) => {
  function splitName(name) {
    const nameArray = name.split(" ");
    const first_name = nameArray[0];
    const last_name = nameArray.slice(1).join(" ");
    return { first_name, last_name };
  }
  let user = {
    ...splitName(req?.user._json.name),
    email: req?.user._json.email,
    profile: req?.user._json.avatar_url,
    provider: "github",
    accessToken: req?.user.accessToken,
  };

  console.log(user);

  // TODO:
  //1. find user with same email
  //2. if found return token(28d)
  //3. if not found save user details then return token(28d)

  let token = jwt.sign(user, "jwt secret here", { expiresIn: "28d" }); // expiry in seconds
  res.cookie("token", token);
  res.redirect(process.env.CLIENT_ORIGIN_URL);
};
