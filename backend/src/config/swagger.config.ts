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
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: [
            { name: 'Auth', description: 'Authentication and OTP management' },
            { name: 'User', description: 'User profile and onboarding' },
            { name: 'Discovery', description: 'Social discovery feed and swipes' },
            { name: 'Chat', description: 'Real-time messaging and matches' },
            { name: 'Safety', description: 'User blocking and reporting' },
            { name: 'Settings', description: 'Account and notification settings' },
            { name: 'Upload', description: 'Media upload services' },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        phoneNumber: { type: 'string' },
                        onboarded: { type: 'boolean' },
                        isVerified: { type: 'boolean' },
                    },
                },
                Profile: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        userId: { type: 'string' },
                        name: { type: 'string' },
                        bio: { type: 'string' },
                        birthDate: { type: 'string', format: 'date-time' },
                        gender: { type: 'string' },
                        location: { type: 'object' },
                        filters: { type: 'object' },
                    },
                },
                Match: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        user1Id: { type: 'string' },
                        user2Id: { type: 'string' },
                        status: { type: 'string', enum: ['PENDING', 'MATCHED', 'UNMATCHED'] },
                    },
                },
            },
        },
    },
    apis: [
        'src/routes/*.ts',
        'src/controllers/*.ts',
        './src/routes/*.ts',
        './src/controllers/*.ts'
    ], // path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
