import config from '../config';
import expressLoader from './express';
import web3loader from './web3';
import Web3Service from '../services/web3Service';
import e_loto from '../../truffle/build/contracts/E_loto.json';

export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  console.log('Express Intialized');

  const { ethereum } = config;
  const web3 = await web3loader(ethereum.provider);
  const web3service = new Web3Service(web3);

  const { abi } = e_loto;
  await web3service.setUpContract(abi, ethereum.contract);
  await web3service.getScheduledBlock();
  await web3service.startListener();

  // contract.events.PlaceStake().on('data', event => {});
  // contract.events.DetermineWinningNumber().on('data', event => {});
};
