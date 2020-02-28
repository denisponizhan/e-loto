import http from 'http';
import socket from 'socket.io';

export default async ({ app }) => {
  const server = http.createServer(app);
  const io = socket(server);
  return io;
};
