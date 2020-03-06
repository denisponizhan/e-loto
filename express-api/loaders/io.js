import socket from 'socket.io';

export default async ({ server }) => {
  return socket(server);
};
