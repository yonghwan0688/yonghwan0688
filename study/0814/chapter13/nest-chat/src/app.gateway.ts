import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  @WebSocketServer() server: Server;
  private userRooms = new Map<string, string>(); // socketId -> roomName

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: string,
  ) {
    console.log('Received message:', data);
    const userRoom = this.userRooms.get(socket.id);

    if (userRoom) {
      // 특정 방에만 메시지 전송
      this.server
        .to(userRoom)
        .emit(
          'message',
          `[${userRoom}] Client=${socket.id.substring(0, 4)}: ${data}`,
        );
    } else {
      // 방에 입장하지 않은 경우 전체에 전송
      this.server.emit(
        'message',
        `[전체] Client=${socket.id.substring(0, 4)}: ${data}`,
      );
    }
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { nickname: string; room: string },
  ) {
    const { nickname, room } = data;

    // 이전 방에서 나가기
    const previousRoom = this.userRooms.get(socket.id);
    if (previousRoom) {
      socket.leave(previousRoom);
      this.server.to(previousRoom).emit('notice', {
        message: `${nickname}님이 ${previousRoom}방에서 나갔습니다.`,
      });
    }

    // 새 방에 입장
    socket.join(room);
    this.userRooms.set(socket.id, room);
    console.log(`${nickname} joined room: ${room}`);

    // 방에 입장 알림
    this.server.to(room).emit('notice', {
      message: `${nickname}님이 ${room}방에 입장했습니다.`,
    });

    // 입장한 사용자에게 확인 메시지
    socket.emit('joinedRoom', {
      room: room,
      message: `${room}방에 성공적으로 입장했습니다.`,
    });
  }

  handleDisconnect(socket: Socket) {
    const userRoom = this.userRooms.get(socket.id);
    if (userRoom) {
      this.server.to(userRoom).emit('notice', {
        message: `사용자가 ${userRoom}방에서 나갔습니다.`,
      });
      this.userRooms.delete(socket.id);
    }
  }
}

@WebSocketGateway({
  namespace: 'room',
  cors: {
    origin: '*',
  },
})
export class RoomGateway {
  rooms: string[] = [];

  @WebSocketServer() server: Server;

  @SubscribeMessage('createRoom')
  handleCreateRoom(@MessageBody() data: { nickname: string; room: string }) {
    const { nickname, room } = data;
    if (!this.rooms.includes(room)) {
      this.rooms.push(room);
      console.log('Rooms updated:', this.rooms);

      // 새 방 생성 알림
      this.server.emit('notice', {
        message: `${nickname}님이 새로운 방 '${room}'을 만들었습니다.`,
      });
    }
    this.server.emit('rooms', this.rooms);
  }

  @SubscribeMessage('getRooms')
  handleGetRooms() {
    this.server.emit('rooms', this.rooms);
  }
}
