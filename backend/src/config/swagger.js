import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "social-media application",
      version: "1.0.0",
    },
    servers: [
      {
        url: process.env.API_BASE_URL,
        description: "Development server",
      },
    ],
    basePath: "/",
  },
  apis: ["src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
