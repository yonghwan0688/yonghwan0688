import { Server, Socket } from 'socket.io';
export declare class AppGateway {
    server: Server;
    private userRooms;
    handleMessage(socket: Socket, data: string): void;
    handleJoinRoom(socket: Socket, data: {
        nickname: string;
        room: string;
    }): void;
    handleDisconnect(socket: Socket): void;
}
export declare class RoomGateway {
    rooms: string[];
    server: Server;
    handleCreateRoom(data: {
        nickname: string;
        room: string;
    }): void;
    handleGetRooms(): void;
}
