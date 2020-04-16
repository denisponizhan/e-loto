import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DBModule } from './db.module';
import { msListenerOptions } from './config';

async function bootstrap() {
  const app = await NestFactory.create(DBModule);
  app.connectMicroservice<MicroserviceOptions>(msListenerOptions);
  app.enableCors();
  await app.startAllMicroservicesAsync();
  const port = app.get('ConfigService').get('port');
  await app.listen(port);
  console.log('Db service is running!');
}
bootstrap();
