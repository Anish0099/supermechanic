import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

let io: Server | null = null;

export const initSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        socket.on('join_job', (jobId: string) => {
            if (jobId) {
                socket.join(`job:${jobId}`);
            }
        });

        socket.on('join_mechanic', (mechanicId: string) => {
            if (mechanicId) {
                socket.join(`mechanic:${mechanicId}`);
            }
        });
    });

    return io;
};

export const getSocket = () => io;
