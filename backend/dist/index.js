import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { initSocket } from './lib/socket.js';
import { ENV_CONFIG } from './config/env.config.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import discoveryRoutes from './routes/discovery.routes.js';
import chatRoutes from './routes/chat.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import safetyRoutes from './routes/safety.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import agoraRoutes from './routes/agora.routes.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config.js';
import { errorHandler } from './middlewares/error.middleware.js';
const app = express();
const server = http.createServer(app);
initSocket(server);
const PORT = ENV_CONFIG.PORT;
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/discovery', discoveryRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/safety', safetyRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/agora', agoraRoutes);
// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Error handler must be last
app.use(errorHandler);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Dating App API is running' });
});
// Socket.io initialization is now handled in lib/socket.js
server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
