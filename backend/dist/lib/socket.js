import { Server } from 'socket.io';
import { ENV_CONFIG } from '../config/env.config.js';
let io;
export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: ENV_CONFIG.CORS_ORIGIN,
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
        // Join a room based on userId for private messaging
        const userId = socket.handshake.query.userId;
        if (userId) {
            socket.join(userId);
            console.log(`User ${userId} joined their room`);
        }
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
    return io;
};
export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};
