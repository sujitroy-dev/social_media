import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { specs, swaggerUi } from "./config/swagger.js";
import usersRouter from "./routes/users.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
  throw new Error(
    "Missing required environment variables. Check docs for more info."
  );
}
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/api/users", usersRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
