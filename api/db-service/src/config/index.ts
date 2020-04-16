import { DB_SERVICE_CLIENT } from '../common/constants';
import { Transport } from '@nestjs/microservices';

export default () => ({
  port: parseInt(process.env.DB_SERVICE_REST_PORT) || 3004,
  db: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    name: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
});

export const msListenerOptions: Object = {
  transport: Transport.TCP,
  options: {
    retryAttempts: 5,
    retryDelay: 3000,
    host: process.env.DB_SERVICE_HOST,
    port: parseInt(process.env.DB_SERVICE_PORT) || 3000,
  },
};

export const msClientOptions: Array<any> = [
  {
    name: DB_SERVICE_CLIENT,
    transport: Transport.TCP,
    options: {
      host: process.env.WS_SERVICE_HOST,
      port: parseInt(process.env.WS_SERVICE_PORT, 10) || 3002,
    },
  },
];
