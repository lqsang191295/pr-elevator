import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ElevatorService } from '../elevator/elevator.service';
import { iElevator, iQueueElevatorPayload } from '../types/elevator.type';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: ['https://pr-elevator.vercel.app', 'https://pr-elevator-client.vercel.app/'],
    methods: ['GET', 'POST'],
  },
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  private static instance: MyGateway;

  constructor(@Inject(forwardRef(() => ElevatorService)) private elevatorService: ElevatorService) {}

  onModuleInit() {
    MyGateway.instance = this

    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  static getInstance(): MyGateway {
    if (!MyGateway.instance) {
      throw new Error('MyGateway has not been initialized yet!');
    }
    return MyGateway.instance;
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'New Message',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      content: body,
    });
  }

  @SubscribeMessage('callElevator')
  onCallElevator(@MessageBody() body: iQueueElevatorPayload) {
    console.log('Call elevator', body);
    const result = this.elevatorService.addQueueElevator(body);

    if (!result) return;

    this.elevatorService.moveElevator(body.id);
  }

  @SubscribeMessage('updateElevator')
  onUpdateElevator(@MessageBody() body: iElevator) {
    this.server.emit('onUpdateElevator', body);
  }
}