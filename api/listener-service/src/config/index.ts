import { LISTENER_SERVICE_CLIENT } from '../common/constants';
import { Transport } from '@nestjs/microservices';

export default () => ({
  port: parseInt(process.env.LISTENER_SERVICE_PORT, 10) || 3001,
  ethereum: {
    contract: process.env.CONTRACT_ADDRESS,
    provider: process.env.WEB3_PROVIDER,
  },
});

export const msClientOptions: Array<any> = [
  {
    name: LISTENER_SERVICE_CLIENT,
    transport: Transport.TCP,
    options: {
      host: process.env.DB_SERVICE_HOST,
      port: parseInt(process.env.DB_SERVICE_PORT, 10) || 3000,
    },
  },
];
