import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Game } from './game.entity';
import { DB_SERVICE } from '../../db.constants';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NEW_GAME_ID, NEW_WINNING_NUMBER } from '../../db.constants';

@EventSubscriber()
export class GameSubscriber implements EntitySubscriberInterface<Game> {
  constructor(
    connection: Connection,
    @Inject(DB_SERVICE) private client: ClientProxy,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Game;
  }

  afterInsert(event: InsertEvent<Game>) {
    const { id } = event.entity;
    this.client.emit(NEW_GAME_ID, {
      id: id,
    });
  }

  afterUpdate(event: UpdateEvent<Game>) {
    const { winningNumber } = event.entity;
    this.client.emit(NEW_WINNING_NUMBER, {
      number: winningNumber,
    });
  }
}
