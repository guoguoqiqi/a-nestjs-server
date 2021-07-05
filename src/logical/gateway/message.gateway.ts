import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

export enum MessageOrigin {
  SYSTEM_MSG = 'systemMsg',
  USER_MSG = 'userMsg'
}

export enum MessageType {
  TEXT_MSG = 'textMsg',
  SMILE_MSG = 'smileMsg',
  IMAGE_MSG = 'imageMsg',
  VIDEO_MSG = 'videoMsg'
}

export interface SendMessageBody {
  account_name: string
  real_name: string
  message_origin: string
  message_type: string
  message_value: any
}


@WebSocketGateway({ namespace: '/chat' })
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('MessageGateway');
  private onlineNumber: number = 0;

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.onlineNumber++
    client.emit('onlineNumberChange', {
      message_origin: MessageOrigin.SYSTEM_MSG,
      message_type: MessageType.TEXT_MSG,
      message_value: JSON.stringify({ onlineNumber: this.onlineNumber })
    });
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.onlineNumber--
    client.emit('onlineNumberChange', {
      message_origin: MessageOrigin.SYSTEM_MSG,
      message_type: MessageType.TEXT_MSG,
      message_value: JSON.stringify({ onlineNumber: this.onlineNumber })
    });
    this.logger.log(`Client disconnected: ${client.id}`);
  }


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