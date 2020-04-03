import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DBModule } from './db.module';
import { msListenerOptions } from './config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DBModule,
    msListenerOptions,
  );
  await app.listenAsync();
  console.log('Db service is running!');
}
bootstrap();
