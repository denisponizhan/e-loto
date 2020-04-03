import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WsModule } from './ws.module';

async function bootstrap() {
  const app = await NestFactory.create(WsModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { retryAttempts: 5, retryDelay: 3000, port: 3002 },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3002); // ?
  console.log('Ws service is running!');
}
bootstrap();
