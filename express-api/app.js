import express from 'express';
import http from 'http';

import loaders from './loaders';
import config from './config';

async function startServer() {
  const app = express();
  const server = http.createServer(app);

  await loaders({ expressApp: app, server: server });

  server.listen(config.port, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server is ready and started on port ${config.port}`);
  });
}

startServer();
