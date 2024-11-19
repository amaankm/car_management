import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Define the Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "Car Management API",
      version: "1.0.0",
      description: "API documentation for the Car Management application",
      contact: {
        name: "Amaan",
        email: "amaankareem4@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000/api", // Change to your API's base URL
      },
    ],
  },
  apis: ["src/routes/*.ts"], // Path to the route files where your JSDoc comments will be
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerSpec, swaggerUi };
