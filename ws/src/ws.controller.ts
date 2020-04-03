import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import {
  NEW_STAKE_EVENT,
  NEW_GAME_ID,
  NEW_WINNER_EVENT,
  NEW_WINNING_NUMBER,
} from './ws.constants';
import {
  NewStakeDto,
  NewWinnerDto,
  NewGameDto,
  NewWinningNumberDto,
} from './dto';

@Controller()
export class WsController {
  @EventPattern(NEW_STAKE_EVENT)
  handleNewStakeEvent(stake: NewStakeDto) {
    console.log(stake);
  }

  @EventPattern(NEW_WINNER_EVENT)
  handleWinnerEvent(winner: NewWinnerDto) {
    console.log(winner);
  }

  @EventPattern(NEW_GAME_ID)
  handleNewGameEvent(game: NewGameDto) {
    console.log(game);
  }

  @EventPattern(NEW_WINNING_NUMBER)
  handleNewWinningNumber(number: NewWinningNumberDto) {
    console.log(number);
  }
}
