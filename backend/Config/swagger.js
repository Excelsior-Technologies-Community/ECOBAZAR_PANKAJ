import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "EcoBazar API",
            version: "1.0.0",
            description: "REST API Documentation for EcoBazar E-commerce Backend",
        },

        servers: [
            {
                url: "http://localhost:5000",
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

        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    apis: ["./Routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;