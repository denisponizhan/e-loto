import { NestFactory } from '@nestjs/core';
import { ListenerModule } from './listener.module';

async function bootstrap() {
  const app = await NestFactory.create(ListenerModule);
  const port = app.get('ConfigService').get('port');
  await app.listen(port);
  console.log(`Listener service is running!`);
}
bootstrap();
