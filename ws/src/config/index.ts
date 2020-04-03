import { Transport } from '@nestjs/microservices';

export default () => ({});

export const msListenerOptions: Object = {
  transport: Transport.TCP,
  options: {
    retryAttempts: 5,
    retryDelay: 3000,
    port: parseInt(process.env.MS_LISTENER_PORT) || 3002,
  },
};
