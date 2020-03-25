import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  LISTENER_SERVICE,
  CONTRACT_PROVIDER,
  NEW_STAKE_EVENT,
  NEW_WINNER_EVENT
} from './listener.constants';

@Injectable()
export class ListenerService {
  constructor(
    @Inject(CONTRACT_PROVIDER) private contract,
    @Inject(LISTENER_SERVICE) private client: ClientProxy
  ) {
    this.init();
  }

  private init() {
    this.startStakersListener();
    this.startWinnersListener();
  }

  private startStakersListener() {
    this.contract.events.NewStake().on('data', event => {
      const { _staker, _bet } = event.returnValues;
      this.client.emit(NEW_STAKE_EVENT, { staker: _staker, bet: _bet });
    });
  }

  private startWinnersListener() {
    this.contract.events.NewWinner().on('data', event => {
      const { _winningNumber, _winner, _rewardAmount } = event.returnValues;
      this.client.emit(NEW_WINNER_EVENT, {
        winningNumber: _winningNumber,
        winner: _winner,
        rewardAmount: _rewardAmount
      });
    });
  }
}
