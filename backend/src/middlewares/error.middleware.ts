import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors.js';
import { sendError } from '../utils/response.js';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`[Error] ${err.message}`, err);

    if (err instanceof AppError) {
        return sendError(res, err.message, err.statusCode, err.details);
    }

    // Handle Zod validation errors
    if (err.name === 'ZodError' || err.flatten) {
        return sendError(res, 'Validation error', 400, err.flatten ? err.flatten() : err);
    }

    // Default error
    return sendError(res, 'Internal server error', 500, process.env.NODE_ENV === 'development' ? err : null);
};
