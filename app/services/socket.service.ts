import { io, Socket } from 'socket.io-client';
import { store } from '../store/store';

const SOCKET_URL = 'http://192.168.0.42:8081';

class SocketService {
  private socket: Socket | null = null;

  connect(userId: string) {
    if (this.socket) return;

    this.socket = io(SOCKET_URL, {
      query: { userId },
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    // Real-time Messaging
    this.socket.on('new_message', (data) => {
      console.log('New message received:', data);
      store.dispatch({ type: 'chat/addMessage', payload: { matchId: data.matchId, message: data } });
    });

    // Match Updates
    this.socket.on('new_match', (data) => {
      console.log('New match found:', data);
      store.dispatch({ type: 'chat/setMatches', payload: [...store.getState().chat.matches, data] });
    });

    // Agora Signaling Listeners
    this.socket.on('incoming-call', (data) => {
      console.log('Incoming call:', data);
      store.dispatch({ 
        type: 'call/receiveCall', 
        payload: { matchId: data.channelName, otherUser: data.fromUser } 
      });
    });

    this.socket.on('call-answered', (data) => {
      console.log('Call answered:', data);
      store.dispatch({ type: 'call/acceptCall' });
    });

    this.socket.on('call-rejected', (data) => {
      console.log('Call rejected:', data);
      store.dispatch({ type: 'call/endCall' });
      setTimeout(() => store.dispatch({ type: 'call/resetCall' }), 2000);
    });

    this.socket.on('end-call', (data) => {
      console.log('Call ended:', data);
      store.dispatch({ type: 'call/endCall' });
      setTimeout(() => store.dispatch({ type: 'call/resetCall' }), 2000);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  // Agora Signaling Emitters
  inviteToCall(to: string, channelName: string, fromUser: any) {
    this.emit('call-invite', { to, channelName, fromUser });
  }

  acceptCall(to: string, channelName: string) {
    this.emit('call-answered', { to, channelName });
  }

  rejectCall(to: string) {
    this.emit('call-rejected', { to });
  }

  endCall(to: string) {
    this.emit('end-call', { to });
  }
}

export const socketService = new SocketService();
