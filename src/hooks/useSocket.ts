import {useEffect, useRef, useState, useCallback} from 'react';
import {io, Socket} from 'socket.io-client';
import {storage} from '../utils/Storage';
import {Message, Chat} from '../interfaces/api.interface';

interface SocketState {
  connected: boolean;
  socket: Socket | null;
  error: string | null;
}

interface UseSocketProps {
  autoConnect?: boolean;
}

interface MessagePayload {
  chatId: string;
  content: string;
  type?: 'text' | 'image' | 'video' | 'audio' | 'document';
  replyTo?: string;
}

interface TypingPayload {
  chatId: string;
}

interface JoinChatPayload {
  chatId: string;
}

export const useSocket = ({autoConnect = true}: UseSocketProps = {}) => {
  const socketRef = useRef<Socket | null>(null);
  const [socketState, setSocketState] = useState<SocketState>({
    connected: false,
    socket: null,
    error: null,
  });

  // Event listeners
  const [newMessage, setNewMessage] = useState<{
    message: Message;
    chat: Chat;
  } | null>(null);
  const [messageSent, setMessageSent] = useState<Message | null>(null);
  const [messageRead, setMessageRead] = useState<{
    messageId: string;
    readBy: string;
    readAt: string;
  } | null>(null);
  const [userTyping, setUserTyping] = useState<{
    userId: string;
    chatId: string;
    isTyping: boolean;
  } | null>(null);
  const [userStatusChanged, setUserStatusChanged] = useState<{
    userId: string;
    username: string;
    isOnline: boolean;
    lastSeen: string;
  } | null>(null);

  const connect = useCallback(() => {
    if (socketRef.current?.connected) return;

    const token = storage.getString('token');
    if (!token) {
      setSocketState(prev => ({
        ...prev,
        error: 'No authentication token found',
      }));
      return;
    }

    const socket = io('ws://localhost:3001', {
      auth: {
        token: token,
      },
      transports: ['websocket'],
      timeout: 60000,
    });

    socketRef.current = socket;

    // Connection events
    socket.on('connect', () => {
      setSocketState(prev => ({
        ...prev,
        connected: true,
        socket,
        error: null,
      }));
    });

    socket.on('disconnect', reason => {
      setSocketState(prev => ({
        ...prev,
        connected: false,
        error: reason,
      }));
    });

    socket.on('connect_error', error => {
      setSocketState(prev => ({
        ...prev,
        connected: false,
        error: error.message,
      }));
    });

    // Message events
    socket.on('message_received', (data: {message: Message; chat: Chat}) => {
      setNewMessage(data);
    });

    socket.on('message_sent', (data: Message) => {
      setMessageSent(data);
    });

    socket.on(
      'message_read',
      (data: {messageId: string; readBy: string; readAt: string}) => {
        setMessageRead(data);
      },
    );

    // Chat events
    socket.on('chat_joined', (data: {chatId: string}) => {});

    socket.on(
      'user_joined_chat',
      (data: {userId: string; username: string; chatId: string}) => {},
    );

    socket.on(
      'user_left_chat',
      (data: {userId: string; username: string; chatId: string}) => {},
    );

    // Typing events
    socket.on(
      'typing_start',
      (data: {userId: string; username: string; chatId: string}) => {
        setUserTyping({
          userId: data.userId,
          chatId: data.chatId,
          isTyping: true,
        });
      },
    );

    socket.on(
      'typing_stop',
      (data: {userId: string; username: string; chatId: string}) => {
        setUserTyping({
          userId: data.userId,
          chatId: data.chatId,
          isTyping: false,
        });
      },
    );

    // Status events
    socket.on(
      'contact_status_changed',
      (data: {
        userId: string;
        username: string;
        isOnline: boolean;
        lastSeen: string;
      }) => {
        setUserStatusChanged(data);
      },
    );

    // Notification events
    socket.on('pending_notifications', (data: {notifications: any[]}) => {});
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setSocketState({
        connected: false,
        socket: null,
        error: null,
      });
    }
  }, []);

  // Socket emit functions
  const joinChat = useCallback((payload: JoinChatPayload) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('join_chat', payload);
    } else {
    }
  }, []);

  const leaveChat = useCallback((payload: JoinChatPayload) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('leave_chat', payload);
    }
  }, []);

  const sendMessage = useCallback((payload: MessagePayload) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('send_message', payload);
    } else {
    }
  }, []);

  const startTyping = useCallback((payload: TypingPayload) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('typing_start', payload);
    }
  }, []);

  const stopTyping = useCallback((payload: TypingPayload) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('typing_stop', payload);
    }
  }, []);

  const updateStatus = useCallback((isOnline: boolean) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('update_status', {isOnline});
    }
  }, []);

  // Clear event data functions
  const clearNewMessage = useCallback(() => setNewMessage(null), []);
  const clearMessageSent = useCallback(() => setMessageSent(null), []);
  const clearMessageRead = useCallback(() => setMessageRead(null), []);
  const clearUserTyping = useCallback(() => setUserTyping(null), []);
  const clearUserStatusChanged = useCallback(
    () => setUserStatusChanged(null),
    [],
  );

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  return {
    // Connection state
    connected: socketState.connected,
    error: socketState.error,
    socket: socketState.socket,

    // Connection methods
    connect,
    disconnect,

    // Emit methods
    joinChat,
    leaveChat,
    sendMessage,
    startTyping,
    stopTyping,
    updateStatus,

    // Event data
    newMessage,
    messageSent,
    messageRead,
    userTyping,
    userStatusChanged,

    // Clear event data
    clearNewMessage,
    clearMessageSent,
    clearMessageRead,
    clearUserTyping,
    clearUserStatusChanged,
  };
};
