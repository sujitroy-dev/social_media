import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authorize = (req, res, next) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, SECRET_KEY);

    // If token is valid, proceed to the next middleware or route handler
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      // If token is invalid or missing, return an unauthorized response
      throw new Error("Unauthorized");
    }
  } catch (error) {
    console.error(error);
    if (
      error.name === "JsonWebTokenError" ||
      error.message === "Unauthorized"
    ) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
