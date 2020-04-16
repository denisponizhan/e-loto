import { Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import {
  StakeInterface,
  GameInterface,
  WinnerInterface,
  WinningNumberInterface,
} from './interfaces';

@WebSocketGateway()
@Injectable()
export class WsService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  async handleConnection() {
    console.log('Connected');
  }

  async handleDisconnect() {
    console.log('Disconnected');
  }

  emitStake(stake: StakeInterface) {
    this.server.emit('stake', stake);
  }

  emitWinner(winner: WinnerInterface) {
    this.server.emit('winner', winner);
  }

  emitGame(game: GameInterface) {
    this.server.emit('game', game);
  }

  emitWinnimgNumber(number: WinningNumberInterface) {
    this.server.emit('winningnumber', number);
  }
}
