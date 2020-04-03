import { Injectable } from '@nestjs/common';
import { StakesRepository } from './stakes.repository';
import { Stake } from './stake.entity';
import { Game } from '../games/game.entity';
import { StakeInterface } from './interfaces/stake.interface';
import { WinnerInterface } from './interfaces/winner.interface';
import { GamesRepository } from '../games/games.repository';

@Injectable()
export class StakesService {
  constructor(
    private stakesRepository: StakesRepository,
    private gamesRepository: GamesRepository,
  ) {}

  async addNewStake(stake: StakeInterface): Promise<Stake> {
    const { gameId, bet, userAddress } = stake;
    const gameObj: Game = await this.gamesRepository.findByEthereumId(gameId);
    const stakeObj: Stake = new Stake();
    stakeObj.userAddress = userAddress;
    stakeObj.bet = bet;
    stakeObj.game = gameObj;
    return this.stakesRepository.save(stakeObj);
  }

  async updateWinnerReward(winner: WinnerInterface): Promise<Stake> {
    const { gameId, address, rewardAmount } = winner;
    const gameObj: Game = await this.gamesRepository.findByEthereumId(gameId);
    const stakeObj: Stake = await this.stakesRepository.findByUserAddressAndGameId(
      address,
      gameObj.id,
    );
    stakeObj.rewardAmount = rewardAmount;
    stakeObj.isWinning = true;
    return this.stakesRepository.save(stakeObj);
  }

  findAll(): Promise<Stake[]> {
    return this.stakesRepository.find();
  }

  findOne(id: string): Promise<Stake> {
    return this.stakesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.stakesRepository.delete(id);
  }
}
