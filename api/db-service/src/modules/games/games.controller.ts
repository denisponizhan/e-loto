import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { GamesService } from './games.service';
import { NewGameDto, NewWinningNumberDto } from './dto';
import { NEW_GAME_ID, NEW_WINNING_NUMBER } from '../../common/constants';

@Controller()
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @EventPattern(NEW_GAME_ID)
  handleGameId(game: NewGameDto) {
    this.gamesService.createGame(game);
  }

  @EventPattern(NEW_WINNING_NUMBER)
  handleWinningNumber(game: NewWinningNumberDto) {
    this.gamesService.updateWinningNumber(game);
  }
}
