export class AppError extends Error {
    message;
    statusCode;
    details;
    constructor(message, statusCode = 500, details = null) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.details = details;
        this.name = 'AppError';
    }
}
export class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}
export class BadRequestError extends AppError {
    constructor(message = 'Bad request', details = null) {
        super(message, 400, details);
    }
}
export class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 411);
    }
}
export class ForbiddenError extends AppError {
    constructor(message = 'Forbidden') {
        super(message, 403);
    }
}
