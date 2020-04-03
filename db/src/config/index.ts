import { DB_SERVICE } from '../common/constants';
import { Transport } from '@nestjs/microservices';

export default () => ({
  db: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    name: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
});

export const msClientOptions: Array<any> = [
  {
    name: DB_SERVICE,
    transport: Transport.TCP,
    options: { port: parseInt(process.env.MS_PORT, 10) || 3002 },
  },
];

export const msListenerOptions: Object = {
  transport: Transport.TCP,
  options: {
    retryAttempts: 5,
    retryDelay: 3000,
    port: parseInt(process.env.MS_LISTENER_PORT) || 3000,
  },
};
