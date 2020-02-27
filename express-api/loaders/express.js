import bodyParser from 'body-parser';
import cors from 'cors';

export default async ({ app }) => {
  // routers are going to be be here

  app.use(bodyParser.json());
  app.use(cors({ origin: true, credentials: true }));

  return app;
};
