import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import web3 from './web3';

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

import e_loto from '../truffle/build/contracts/E_loto.json';

let contract = new web3.eth.Contract(e_loto.abi, process.env.CONTRACT_ADDRESS);
let scheduledBlock;
let isUnderTransaction = false;

(async () => {
  scheduledBlock = await contract.methods.scheduledBlock().call();
})();

web3.eth.subscribe('newBlockHeaders', async (err, res) => {
  if (!err) {
    const currentBlockNumber = parseInt(res.number);

    if (
      parseInt(currentBlockNumber) >= parseInt(scheduledBlock) &&
      !isUnderTransaction
    ) {
      try {
        isUnderTransaction = true;

        const tx_builder = contract.methods.determineWinners();
        const encoded_tx = tx_builder.encodeABI();
        const transactionObject = {
          gas: process.env.GAS,
          data: encoded_tx,
          from: process.env.ADMIN_ADDRESS,
          to: process.env.CONTRACT_ADDRESS
        };
        const signedTx = await web3.eth.accounts.signTransaction(
          transactionObject,
          process.env.ADMIN_PRIVATE_KEY
        );
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        scheduledBlock = await contract.methods.scheduledBlock().call();
        isUnderTransaction = false;
      } catch (e) {
        console.log(e);
      }
    }
    return;
  } else {
    console.error(err);
  }
});

contract.events.PlaceStake().on('data', event => {});
contract.events.DetermineWinningNumber().on('data', event => {});

app.listen(process.env.PORT, () =>
  console.log(`Server Started on port: ${process.env.PORT}`)
);
