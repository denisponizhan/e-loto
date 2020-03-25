import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class DBController {
  constructor() {}

  @EventPattern('new_stake')
  handleNewStake(data: Record<string, unknown>) {
    console.log(data);
  }

  @EventPattern('new_wiinner')
  handleNewWiner(data: Record<string, unknown>) {
    console.log(data);
  }
}
