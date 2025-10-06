const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "TaskForge API Documentation",
    version: "1.0.0",
    description:
      "Comprehensive API documentation for TaskForge — a Trello-style project management backend built with Node.js, Express, MongoDB, and Socket.io.",
  },
  servers: [
    {
      url: "http://localhost:5000/api", // change later to your live URL
      description: "Local Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // Path where Swagger scans route docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
