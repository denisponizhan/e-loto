import { Module } from '@nestjs/common';
import { WsController } from './ws.controller';
import { WsService } from './ws.service';

@Module({
  providers: [WsService],
  controllers: [WsController],
})
export class WsModule {}
