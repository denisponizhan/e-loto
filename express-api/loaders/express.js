import bodyParser from 'body-parser';
import cors from 'cors';

export default async ({ app }) => {
  app.use(bodyParser.json());
  app.use(cors({ origin: true, credentials: true }));

  return app;
};
