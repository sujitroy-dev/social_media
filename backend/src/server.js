import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

// Routes
// app.use('/api/user', user)

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
