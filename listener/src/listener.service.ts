import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  LISTENER_SERVICE,
  CONTRACT_PROVIDER,
  NEW_STAKE_EVENT,
  NEW_WINNER_EVENT,
  NEW_GAME_ID,
  NEW_WINNING_NUMBER
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
    const options = {
      fromBlock: 0,
      toBlock: 'latest'
    };
    this.startStakersListener(options);
    this.startWinnersListener(options);
    this.startWinningNumbersListener(options);
    this.startNewGameListener(options);
  }

  private startStakersListener(options) {
    this.contract.events
      .NewStake(options)
      .on('data', event => {
        const { _gameId, _staker, _bet } = event.returnValues;
        console.log('new stake: ' + _staker + ' ' + _bet);
        this.client.emit(NEW_STAKE_EVENT, {
          gameId: _gameId,
          userAddress: _staker,
          bet: _bet
        });
      })
      .on('error', console.error);
  }

  private startWinnersListener(options) {
    this.contract.events
      .NewWinner(options)
      .on('data', event => {
        const { _gameId, _winner, _rewardAmount } = event.returnValues;
        console.log('new winner: ' + _winner + ' ' + _rewardAmount);
        this.client.emit(NEW_WINNER_EVENT, {
          gameId: _gameId,
          address: _winner,
          rewardAmount: _rewardAmount
        });
      })
      .on('error', console.error);
  }

  private startWinningNumbersListener(options) {
    this.contract.events
      .NewWinningNumber(options)
      .on('data', event => {
        const { _gameId, _winningNumber } = event.returnValues;
        this.client.emit(NEW_WINNING_NUMBER, {
          id: _gameId,
          winningNumber: _winningNumber
        });
      })
      .on('error', console.error);
  }

  private startNewGameListener(options) {
    this.contract.events
      .NewGameId(options)
      .on('data', event => {
        const { _gameId } = event.returnValues;
        console.log('new game: ' + _gameId);
        this.client.emit(NEW_GAME_ID, {
          id: _gameId
        });
      })
      .on('error', console.error);
  }
}
