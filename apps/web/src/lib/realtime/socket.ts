import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = () => {
    if (!socket) {
        const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        socket = io(url, {
            transports: ['websocket'],
        });
    }

    return socket;
};

export const disconnectSocket = () => {
    socket?.disconnect();
    socket = null;
};
