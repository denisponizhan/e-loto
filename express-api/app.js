import express from 'express';
import loaders from './loaders';
import config from './config';

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(config.port, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server is ready and started on port ${config.port}`);
  });
}

startServer();
