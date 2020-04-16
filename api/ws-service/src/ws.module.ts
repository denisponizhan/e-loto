import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WsController } from './ws.controller';
import { WsService } from './ws.service';
import configuration from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [WsService],
  controllers: [WsController],
})
export class WsModule {}
