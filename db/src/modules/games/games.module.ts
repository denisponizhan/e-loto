import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { GamesRepository } from './games.repository';
import { GameSubscriber } from './game.subscriber';
import { DB_SERVICE } from '../../db.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([GamesRepository]),
    ClientsModule.register([
      { name: DB_SERVICE, transport: Transport.TCP, options: { port: 3002 } },
    ]),
  ],
  providers: [GamesService, GameSubscriber],
  controllers: [GamesController],
})
export class GamesModule {}
