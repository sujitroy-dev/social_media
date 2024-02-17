import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

const options = {
  swaggerDefinition: {
    info: {
      title: "PetPals",
      version: "1.0.0",
      description:
        "PetPals is a community platform where you can upload photos and videos of your pets.",
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
