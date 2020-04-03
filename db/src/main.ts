import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DBModule } from './db.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DBModule,
    {
      transport: Transport.TCP,
      options: { retryAttempts: 5, retryDelay: 3000, port: 3000 },
    },
  );
  await app.listenAsync();
  console.log('Db service is running!');
}
bootstrap();
