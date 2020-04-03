import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StakersController } from './stakes.controller';
import { StakesService } from './stakes.service';
import { StakesRepository } from './stakes.repository';
import { StakeSubscriber } from './stake.subscriber';
import { GamesRepository } from '../games/games.repository';
import { DB_SERVICE } from '../../db.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([StakesRepository, GamesRepository]),
    ClientsModule.register([
      { name: DB_SERVICE, transport: Transport.TCP, options: { port: 3002 } },
    ]),
  ],
  providers: [StakesService, StakeSubscriber],
  controllers: [StakersController],
})
export class StakesModule {}
