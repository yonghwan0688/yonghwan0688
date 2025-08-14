"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomGateway = exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let AppGateway = class AppGateway {
    server;
    userRooms = new Map();
    handleMessage(socket, data) {
        console.log('Received message:', data);
        const userRoom = this.userRooms.get(socket.id);
        if (userRoom) {
            this.server
                .to(userRoom)
                .emit('message', `[${userRoom}] Client=${socket.id.substring(0, 4)}: ${data}`);
        }
        else {
            this.server.emit('message', `[전체] Client=${socket.id.substring(0, 4)}: ${data}`);
        }
    }
    handleJoinRoom(socket, data) {
        const { nickname, room } = data;
        const previousRoom = this.userRooms.get(socket.id);
        if (previousRoom) {
            socket.leave(previousRoom);
            this.server.to(previousRoom).emit('notice', {
                message: `${nickname}님이 ${previousRoom}방에서 나갔습니다.`,
            });
        }
        socket.join(room);
        this.userRooms.set(socket.id, room);
        console.log(`${nickname} joined room: ${room}`);
        this.server.to(room).emit('notice', {
            message: `${nickname}님이 ${room}방에 입장했습니다.`,
        });
        socket.emit('joinedRoom', {
            room: room,
            message: `${room}방에 성공적으로 입장했습니다.`,
        });
    }
    handleDisconnect(socket) {
        const userRoom = this.userRooms.get(socket.id);
        if (userRoom) {
            this.server.to(userRoom).emit('notice', {
                message: `사용자가 ${userRoom}방에서 나갔습니다.`,
            });
            this.userRooms.delete(socket.id);
        }
    }
};
exports.AppGateway = AppGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleJoinRoom", null);
exports.AppGateway = AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], AppGateway);
let RoomGateway = class RoomGateway {
    rooms = [];
    server;
    handleCreateRoom(data) {
        const { nickname, room } = data;
        if (!this.rooms.includes(room)) {
            this.rooms.push(room);
            console.log('Rooms updated:', this.rooms);
            this.server.emit('notice', {
                message: `${nickname}님이 새로운 방 '${room}'을 만들었습니다.`,
            });
        }
        this.server.emit('rooms', this.rooms);
    }
    handleGetRooms() {
        this.server.emit('rooms', this.rooms);
    }
};
exports.RoomGateway = RoomGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], RoomGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleCreateRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getRooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleGetRooms", null);
exports.RoomGateway = RoomGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'room',
        cors: {
            origin: '*',
        },
    })
], RoomGateway);
//# sourceMappingURL=app.gateway.js.map