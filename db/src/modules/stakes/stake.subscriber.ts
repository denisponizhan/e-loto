import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Stake } from './stake.entity';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  DB_SERVICE,
  NEW_STAKE_EVENT,
  NEW_WINNER_EVENT,
} from '../../db.constants';

@EventSubscriber()
export class StakeSubscriber implements EntitySubscriberInterface<Stake> {
  constructor(
    connection: Connection,
    @Inject(DB_SERVICE) private client: ClientProxy,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Stake;
  }

  afterInsert(event: InsertEvent<Stake>) {
    const { userAddress, bet, createdDate } = event.entity;
    this.client.emit(NEW_STAKE_EVENT, {
      userAddress: userAddress,
      bet: bet,
      stakeDate: createdDate,
    });
  }

  afterUpdate(event: UpdateEvent<Stake>) {
    const { userAddress, isWinning, updatedDate, rewardAmount } = event.entity;
    if (isWinning) {
      this.client.emit(NEW_WINNER_EVENT, {
        userAddress: userAddress,
        rewardAmount: rewardAmount,
        winningDate: updatedDate,
      });
    }
  }
}
