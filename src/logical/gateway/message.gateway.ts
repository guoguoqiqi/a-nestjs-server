import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';


@WebSocketGateway({ namespace: '/chat' })
export class MessageGateway {

  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('MessageGateway');

  @SubscribeMessage('enterRoom')
  enterRoom(client: Socket, data: unknown): WsResponse<unknown> {
    this.logger.log(data)
    // 通知对应客户端 events 事件
    client.emit('enteredRoom', data);
    // 通知其他客户端 chat 事件
    client.broadcast.emit('enteredRoom', data);
    return
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(client: Socket, data: unknown): WsResponse<unknown> {
    this.logger.log(data)
    client.emit('leavedRoom', data);
    client.broadcast.emit('leavedRoom', data);
    return
  }

  @SubscribeMessage('sendMessage')
  sendMessage(client: Socket, data: unknown): WsResponse<unknown> {
    this.logger.log(data)
    client.emit('sendMessage', data);
    client.broadcast.emit('sendMessage', data);
    return
  }
}