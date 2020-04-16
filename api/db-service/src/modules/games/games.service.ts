import { Injectable } from '@nestjs/common';
import { GamesRepository } from './games.repository';
import { Game } from './game.entity';
import { GameInterface } from './interfaces';

@Injectable()
export class GamesService {
  constructor(private gamesRepository: GamesRepository) {}

  createGame(game: GameInterface): Promise<Game> {
    const { id } = game;
    const gameObj: Game = new Game();
    gameObj.ethereumId = id;
    return this.gamesRepository.save(gameObj);
  }

  async updateWinningNumber(game: GameInterface): Promise<Game> {
    const { id, winningNumber } = game;
    const gameObj: Game = await this.gamesRepository.findByEthereumId(id);
    if (gameObj != undefined) {
      gameObj.winningNumber = winningNumber;
      return this.gamesRepository.save(gameObj);
    }
  }

  findAll(): Promise<Game[]> {
    return this.gamesRepository.find();
  }

  findOne(id: string): Promise<Game> {
    return this.gamesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.gamesRepository.delete(id);
  }
}
