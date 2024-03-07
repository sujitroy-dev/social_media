import jwt from "jsonwebtoken";
import pool from "../config/database.js";

export const authEmail = async (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password,
    provider: "email",
  };
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
