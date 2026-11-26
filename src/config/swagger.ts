import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "VIAGEM API",
      version: "1.0.0",
      description: "API de billetera multidivisa para viajeros",
    },
    servers: [
      {
        url: "https://viagem-backend-production.up.railway.app",
        description: "Servidor de producción",
      },
      {
        url: "http://localhost:3000",
        description: "Servidor de desarrollo",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

