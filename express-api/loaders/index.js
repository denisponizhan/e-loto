import config from '../config';
import expressLoader from './express';
import web3loader from './web3';
import ioLoader from './io';
import ElotoService from '../services/elotoService';
import BlockListener from '../services/blockListener';

export default async ({ expressApp, server }) => {
  await expressLoader({ app: expressApp });
  const io = await ioLoader({ server: server });

  const { ethereum } = config;
  const web3 = await web3loader(ethereum.provider);

  const eLotoService = new ElotoService(web3);
  const blockListener = new BlockListener(web3);

  // blockListener.setScheduledBlock(await eLotoService.getScheduledBlock());
  // blockListener.listen();
  eLotoService.startEventListener();

  blockListener.on('scheduled', async () => {
    // await eLotoService.determineWinners();
    // blockListener.setScheduledBlock(await eLotoService.getScheduledBlock());
  });

  eLotoService.on('stake', async ({ _staker, _bet }) => {
    // add stake to db
    io.emit('stake', { _staker, _bet });
  });

  eLotoService.on(
    'winners',
    async ({ _winningNumber, _winners, _rewardAmount }) => {
      // add winners to db
      io.emit('winners', { _winningNumber, _winners, _rewardAmount });
    }
  );
};
