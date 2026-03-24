import dotenv from 'dotenv';
dotenv.config();

export const ENV_CONFIG = {
    PORT: Number(process.env.PORT) || 8001,
    HOST: process.env.HOST || '0.0.0.0',
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET: process.env.SECRET_KEY || 'supersecretkey123',
    ALGORITHM: process.env.ALGORITHM || 'HS256',
    ACCESS_TOKEN_EXPIRE_MINUTES: Number(process.env.ACCESS_TOKEN_EXPIRE_MINUTES) || 30,

    // Database
    DB: {
        DATABASE: process.env.DB_DATABASE,
        USERNAME: process.env.DB_USERNAME,
        PASSWORD: process.env.DB_PASSWORD,
        HOST: process.env.DB_HOST,
        PORT: Number(process.env.DB_PORT) || 5432,
        POOL_SIZE: Number(process.env.DB_POOL_SIZE) || 10,
        MAX_OVERFLOW: Number(process.env.DB_MAX_OVERFLOW) || 5,
        ECHO: process.env.DB_ECHO === 'True',
    },

    // Google OAuth
    GOOGLE: {
        CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
    },

    // App Settings
    UPLOAD: {
        DIR: process.env.UPLOAD_DIR || 'uploads/resumes',
        MAX_SIZE: Number(process.env.MAX_UPLOAD_SIZE) || 10485760,
        ALLOWED_EXTENSIONS: (process.env.ALLOWED_EXTENSIONS || 'pdf,doc,docx').split(','),
    },

    FRONTEND_REDIRECT_URL: process.env.FRONTEND_REDIRECT_URL || 'http://localhost:3000/oauth/callback',

    // Legacy / Internal
    OTP_MOCK: '123456',
    CORS_ORIGIN: '*',
};
