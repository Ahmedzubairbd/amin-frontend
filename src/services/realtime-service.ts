import { io, Socket } from 'socket.io-client';

// ----------------------------------------------------------------------

interface RealtimeConfig {
  url: string;
  secret: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'file' | 'image';
  fileUrl?: string;
}

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: Date;
  relatedId?: string;
  relatedType?: string;
}

interface RealtimeEvent {
  type: 'chat' | 'notification' | 'appointment' | 'test_result';
  data: any;
}

class RealtimeService {
  private config: RealtimeConfig;
  private socket: Socket | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  // Event listeners
  private chatListeners: ((message: ChatMessage) => void)[] = [];
  private notificationListeners: ((notification: Notification) => void)[] = [];
  private appointmentListeners: ((appointment: any) => void)[] = [];
  private testResultListeners: ((testResult: any) => void)[] = [];
  private connectionListeners: ((connected: boolean) => void)[] = [];

  constructor() {
    this.config = {
      url: process.env.SOCKET_IO_URL || 'http://localhost:3001',
      secret: process.env.SOCKET_IO_SECRET || '',
    };
  }

  /**
   * Initialize socket connection
   */
  async connect(userId: string, token: string): Promise<boolean> {
    try {
      if (this.socket && this.isConnected) {
        return true;
      }

      this.socket = io(this.config.url, {
        auth: {
          token,
          userId,
        },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: this.reconnectDelay,
        timeout: 20000,
      });

      this.setupEventListeners();
      return this.waitForConnection();
    } catch (error) {
      console.error('Failed to connect to real-time service:', error);
      return false;
    }
  }

  /**
   * Wait for socket connection
   */
  private waitForConnection(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.socket) {
        resolve(false);
        return;
      }

      const timeout = setTimeout(() => {
        resolve(false);
      }, 10000);

      this.socket.on('connect', () => {
        clearTimeout(timeout);
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.notifyConnectionListeners(true);
        resolve(true);
      });

      this.socket.on('connect_error', (error) => {
        clearTimeout(timeout);
        console.error('Socket connection error:', error);
        this.isConnected = false;
        this.notifyConnectionListeners(false);
        resolve(false);
      });
    });
  }

  /**
   * Setup socket event listeners
   */
  private setupEventListeners(): void {
    if (!this.socket) return;

    // Connection events
    this.socket.on('disconnect', () => {
      this.isConnected = false;
      this.notifyConnectionListeners(false);
      console.log('Disconnected from real-time service');
    });

    this.socket.on('reconnect', () => {
      this.isConnected = true;
      this.notifyConnectionListeners(true);
      console.log('Reconnected to real-time service');
    });

    // Chat events
    this.socket.on('chat_message', (message: ChatMessage) => {
      this.notifyChatListeners(message);
    });

    this.socket.on('chat_typing', (data: { userId: string; isTyping: boolean }) => {
      // Handle typing indicators
      console.log('User typing:', data);
    });

    // Notification events
    this.socket.on('notification', (notification: Notification) => {
      this.notifyNotificationListeners(notification);
    });

    // Appointment events
    this.socket.on('appointment_update', (appointment: any) => {
      this.notifyAppointmentListeners(appointment);
    });

    this.socket.on('appointment_reminder', (appointment: any) => {
      this.notifyAppointmentListeners(appointment);
    });

    // Test result events
    this.socket.on('test_result_ready', (testResult: any) => {
      this.notifyTestResultListeners(testResult);
    });

    // Error events
    this.socket.on('error', (error: any) => {
      console.error('Socket error:', error);
    });
  }

  /**
   * Disconnect from socket
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.notifyConnectionListeners(false);
    }
  }

  /**
   * Send chat message
   */
  sendChatMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>): void {
    if (!this.socket || !this.isConnected) {
      console.error('Socket not connected');
      return;
    }

    this.socket.emit('send_message', message);
  }

  /**
   * Join chat room
   */
  joinChatRoom(roomId: string): void {
    if (!this.socket || !this.isConnected) {
      console.error('Socket not connected');
      return;
    }

    this.socket.emit('join_room', { roomId });
  }

  /**
   * Leave chat room
   */
  leaveChatRoom(roomId: string): void {
    if (!this.socket || !this.isConnected) {
      console.error('Socket not connected');
      return;
    }

    this.socket.emit('leave_room', { roomId });
  }

  /**
   * Send typing indicator
   */
  sendTypingIndicator(receiverId: string, isTyping: boolean): void {
    if (!this.socket || !this.isConnected) {
      console.error('Socket not connected');
      return;
    }

    this.socket.emit('typing', { receiverId, isTyping });
  }

  /**
   * Mark notification as read
   */
  markNotificationAsRead(notificationId: string): void {
    if (!this.socket || !this.isConnected) {
      console.error('Socket not connected');
      return;
    }

    this.socket.emit('mark_notification_read', { notificationId });
  }

  /**
   * Subscribe to chat messages
   */
  onChatMessage(callback: (message: ChatMessage) => void): () => void {
    this.chatListeners.push(callback);
    return () => {
      const index = this.chatListeners.indexOf(callback);
      if (index > -1) {
        this.chatListeners.splice(index, 1);
      }
    };
  }

  /**
   * Subscribe to notifications
   */
  onNotification(callback: (notification: Notification) => void): () => void {
    this.notificationListeners.push(callback);
    return () => {
      const index = this.notificationListeners.indexOf(callback);
      if (index > -1) {
        this.notificationListeners.splice(index, 1);
      }
    };
  }

  /**
   * Subscribe to appointment updates
   */
  onAppointmentUpdate(callback: (appointment: any) => void): () => void {
    this.appointmentListeners.push(callback);
    return () => {
      const index = this.appointmentListeners.indexOf(callback);
      if (index > -1) {
        this.appointmentListeners.splice(index, 1);
      }
    };
  }

  /**
   * Subscribe to test result updates
   */
  onTestResultUpdate(callback: (testResult: any) => void): () => void {
    this.testResultListeners.push(callback);
    return () => {
      const index = this.testResultListeners.indexOf(callback);
      if (index > -1) {
        this.testResultListeners.splice(index, 1);
      }
    };
  }

  /**
   * Subscribe to connection status
   */
  onConnectionChange(callback: (connected: boolean) => void): () => void {
    this.connectionListeners.push(callback);
    return () => {
      const index = this.connectionListeners.indexOf(callback);
      if (index > -1) {
        this.connectionListeners.splice(index, 1);
      }
    };
  }

  /**
   * Notify chat listeners
   */
  private notifyChatListeners(message: ChatMessage): void {
    this.chatListeners.forEach(callback => {
      try {
        callback(message);
      } catch (error) {
        console.error('Error in chat listener:', error);
      }
    });
  }

  /**
   * Notify notification listeners
   */
  private notifyNotificationListeners(notification: Notification): void {
    this.notificationListeners.forEach(callback => {
      try {
        callback(notification);
      } catch (error) {
        console.error('Error in notification listener:', error);
      }
    });
  }

  /**
   * Notify appointment listeners
   */
  private notifyAppointmentListeners(appointment: any): void {
    this.appointmentListeners.forEach(callback => {
      try {
        callback(appointment);
      } catch (error) {
        console.error('Error in appointment listener:', error);
      }
    });
  }

  /**
   * Notify test result listeners
   */
  private notifyTestResultListeners(testResult: any): void {
    this.testResultListeners.forEach(callback => {
      try {
        callback(testResult);
      } catch (error) {
        console.error('Error in test result listener:', error);
      }
    });
  }

  /**
   * Notify connection listeners
   */
  private notifyConnectionListeners(connected: boolean): void {
    this.connectionListeners.forEach(callback => {
      try {
        callback(connected);
      } catch (error) {
        console.error('Error in connection listener:', error);
      }
    });
  }

  /**
   * Get connection status
   */
  isSocketConnected(): boolean {
    return this.isConnected && this.socket?.connected === true;
  }

  /**
   * Get socket instance
   */
  getSocket(): Socket | null {
    return this.socket;
  }

  /**
   * Emit custom event
   */
  emit(event: string, data: any): void {
    if (!this.socket || !this.isConnected) {
      console.error('Socket not connected');
      return;
    }

    this.socket.emit(event, data);
  }

  /**
   * Listen to custom event
   */
  on(event: string, callback: (data: any) => void): () => void {
    if (!this.socket) {
      console.error('Socket not initialized');
      return () => {};
    }

    this.socket.on(event, callback);
    return () => {
      this.socket?.off(event, callback);
    };
  }
}

// Export singleton instance
export const realtimeService = new RealtimeService();
export default realtimeService; 