import { Transport } from '@nestjs/microservices';

export default () => ({
  port: parseInt(process.env.WS_SERVICE_IO_PORT) || 3003,
});

export const msListenerOptions: Object = {
  transport: Transport.TCP,
  options: {
    retryAttempts: 5,
    retryDelay: 3000,
    host: process.env.WS_SERVICE_HOST,
    port: parseInt(process.env.WS_SERVICE_PORT) || 3002,
  },
};
