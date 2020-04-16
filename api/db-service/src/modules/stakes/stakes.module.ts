import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StakersController } from './stakes.controller';
import { StakesService } from './stakes.service';
import { StakesRepository } from './stakes.repository';
import { StakeSubscriber } from './stake.subscriber';
import { GamesRepository } from '../games/games.repository';
import { msClientOptions } from '../../config';

@Module({
  imports: [
    TypeOrmModule.forFeature([StakesRepository, GamesRepository]),
    ClientsModule.register(msClientOptions),
  ],
  providers: [StakesService, StakeSubscriber],
  controllers: [StakersController],
})
export class StakesModule {}
