import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import {
  NEW_STAKE_EVENT,
  NEW_GAME_ID,
  NEW_WINNER_EVENT,
  NEW_WINNING_NUMBER,
} from './common/constants';
import {
  NewStakeDto,
  NewWinnerDto,
  NewGameDto,
  NewWinningNumberDto,
} from './dto';
import { WsService } from './ws.service';

@Controller()
export class WsController {
  constructor(private wsSerivce: WsService) {}

  @EventPattern(NEW_STAKE_EVENT)
  handleNewStakeEvent(stake: NewStakeDto) {
    this.wsSerivce.emitStake(stake);
  }

  @EventPattern(NEW_WINNER_EVENT)
  handleWinnerEvent(winner: NewWinnerDto) {
    this.wsSerivce.emitWinner(winner);
  }

  @EventPattern(NEW_GAME_ID)
  handleNewGameEvent(game: NewGameDto) {
    this.wsSerivce.emitGame(game);
  }

  @EventPattern(NEW_WINNING_NUMBER)
  handleNewWinningNumber(number: NewWinningNumberDto) {
    this.wsSerivce.emitWinnimgNumber(number);
  }
}
