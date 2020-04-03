import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { StakesService } from './stakes.service';
import { NEW_STAKE_EVENT, NEW_WINNER_EVENT } from '../../common/constants';
import { NewStakeDto, NewWinnerDto } from './dto';

@Controller()
export class StakersController {
  constructor(private stakesService: StakesService) {}

  @EventPattern(NEW_STAKE_EVENT)
  async handleGameId(stake: NewStakeDto) {
    this.stakesService.addNewStake(stake);
  }

  @EventPattern(NEW_WINNER_EVENT)
  handleNewWiner(winner: NewWinnerDto) {
    this.stakesService.updateWinnerReward(winner);
  }
}
