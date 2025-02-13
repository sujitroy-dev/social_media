import jwt from "jsonwebtoken";

export const jwtAuthenticate = (req, res, next) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new Error("Token not found");
    }

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
