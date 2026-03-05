import swaggerJsdoc from 'swagger-jsdoc';
import { ENV_CONFIG } from './env.config.js';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Dating App API',
            version: '1.0.0',
            description: 'API documentation for the Dating App Backend',
            contact: {
                name: 'API Support',
            },
        },
        servers: [
            {
                url: `http://localhost:${ENV_CONFIG.PORT}`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
