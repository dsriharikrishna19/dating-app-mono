import dotenv from 'dotenv';
dotenv.config();
export const ENV_CONFIG = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    OTP_MOCK: '123456',
    CORS_ORIGIN: '*',
    NODE_ENV: process.env.NODE_ENV || 'development',
};
