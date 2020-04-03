import { LISTENER_SERVICE } from '../common/constants';
import { Transport } from '@nestjs/microservices';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  ethereum: {
    contract: process.env.CONTRACT_ADDRESS,
    provider: process.env.WEB3_PROVIDER
  }
});

export const msListenerOptions: Array<any> = [
  {
    name: LISTENER_SERVICE,
    transport: Transport.TCP,
    options: { port: parseInt(process.env.MS_PORT, 10) || 3000 }
  }
];
