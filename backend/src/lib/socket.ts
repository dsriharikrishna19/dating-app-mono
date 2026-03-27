import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { ENV_CONFIG } from '../config/env.config.js';

let io: Server;

export const initSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: ENV_CONFIG.CORS_ORIGIN,
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Join a room based on userId for private messaging
        const userId = socket.handshake.query.userId as string;
        if (userId) {
            socket.join(userId);
            console.log(`User ${userId} joined their room`);
        }

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });

        // Agora Calling Signaling
        socket.on('call-invite', ({ to, channelName, fromUser }) => {
            console.log(`Call invite from ${userId} to ${to} on channel ${channelName}`);
            socket.to(to).emit('incoming-call', { from: userId, fromUser, channelName });
        });

        socket.on('call-answered', ({ to, channelName }) => {
            console.log(`Call answered by ${userId} for ${to} on channel ${channelName}`);
            socket.to(to).emit('call-answered', { from: userId, channelName });
        });

        socket.on('call-rejected', ({ to }) => {
            console.log(`Call rejected by ${userId} for ${to}`);
            socket.to(to).emit('call-rejected', { from: userId });
        });

        socket.on('end-call', ({ to }) => {
            console.log(`Call ended by ${userId} for ${to}`);
            socket.to(to).emit('end-call', { from: userId });
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
