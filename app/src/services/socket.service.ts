import { io, Socket } from "socket.io-client";
import { API_CONFIG } from "./apiConfig";

class SocketService {
    private socket: Socket | null = null;

    connect(userId: string) {
        if (this.socket) return;

        // Remove /api/v1 from BASE_URL for socket connection if it exists
        const socketUrl = API_CONFIG.BASE_URL.split("/api")[0];

        this.socket = io(socketUrl, {
            query: { userId },
            transports: ["websocket"],
        });

        this.socket.on("connect", () => {
            console.log("Connected to signaling server:", this.socket?.id);
        });

        this.socket.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    emit(event: string, data: any) {
        this.socket?.emit(event, data);
    }

    on(event: string, callback: (data: any) => void) {
        this.socket?.on(event, callback);
    }

    off(event: string) {
        this.socket?.off(event);
    }

    getSocketId() {
        return this.socket?.id;
    }
}

export const socketService = new SocketService();
