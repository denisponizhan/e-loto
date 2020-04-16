import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { GamesRepository } from './games.repository';
import { GameSubscriber } from './game.subscriber';
import { msClientOptions } from '../../config';

@Module({
  imports: [
    TypeOrmModule.forFeature([GamesRepository]),
    ClientsModule.register(msClientOptions),
  ],
  providers: [GamesService, GameSubscriber],
  controllers: [GamesController],
})
export class GamesModule {}
