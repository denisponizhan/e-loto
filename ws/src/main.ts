import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { WsModule } from './ws.module';
import { msListenerOptions } from './config';

async function bootstrap() {
  const app = await NestFactory.create(WsModule);
  app.connectMicroservice<MicroserviceOptions>(msListenerOptions);
  await app.startAllMicroservicesAsync();
  console.log('Ws service is running!');
}
bootstrap();
