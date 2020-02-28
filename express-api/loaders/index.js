import config from '../config';
import expressLoader from './express';
import web3loader from './web3';
import ioLoader from './io';
import ElotoService from '../services/elotoService';
import BlockListener from '../services/blockListener';

export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  await ioLoader({ app: expressApp });

  const { ethereum } = config;
  const web3 = await web3loader(ethereum.provider);

  const eLotoService = new ElotoService(web3);
  const blockListener = new BlockListener(web3);

  blockListener.setScheduledBlock(await eLotoService.getScheduledBlock());
  blockListener.listen();

  eLotoService.startEventListener();

  blockListener.on('scheduled', async () => {
    await eLotoService.determineWinners();
    blockListener.setScheduledBlock(await eLotoService.getScheduledBlock());
  });
};
