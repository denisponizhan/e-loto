import EventEmitter from 'events';

import config from '../config';
import { abi } from '../../truffle/build/contracts/E_loto.json';

export default class ElotoService extends EventEmitter {
  constructor(web3) {
    super();
    this.web3 = web3;
    this.contract = new this.web3.eth.Contract(abi, config.ethereum.contract);
    this.isUnderTransaction = false;
  }

  async getScheduledBlock() {
    return this.contract.methods.scheduledBlock().call();
  }

  async determineWinners() {
    if (!this.isUnderTransaction) {
      try {
        this.isUnderTransaction = true;
        const { ethereum } = config;
        const tx_builder = this.contract.methods.determineWinners();
        const encoded_tx = tx_builder.encodeABI();
        const transactionObject = {
          gas: ethereum.gasLimit,
          data: encoded_tx,
          from: ethereum.admin.address,
          to: ethereum.contract
        };
        const signedTx = await this.web3.eth.accounts.signTransaction(
          transactionObject,
          ethereum.admin.private
        );
        await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      } catch (e) {
        console.log(e);
      }
      this.isUnderTransaction = false;
    }
  }

  startEventListener() {
    this.contract.events.NewStake().on('data', event => {
      const { _staker, _bet } = event.returnValues;
      console.log('New stake: ' + _staker + ', bet: ' + _bet);
    });

    // this.contract.events.NewWinners().on('data', event => {
    //   const { _winningNumber, _winners, _rewardAmount } = event.returnValues;
    //   console.log(
    //     'Winners: ' +
    //       _winners +
    //       ', winning number: ' +
    //       _winningNumber +
    //       ', reward: ' +
    //       _rewardAmount
    //   );
    // });

    this.contract.events.NewProvableQuery().on('data', event => {
      const { _description } = event.returnValues;
      console.log(_description);
    });

    this.contract.events.NoWinners().on('data', event => {
      const { _description } = event.returnValues;
      console.log(_description);
    });

    this.contract.events.NoStakes().on('data', event => {
      const { _description } = event.returnValues;
      console.log('Price: ' + _description);
    });

    this.contract.events.NewWinner().on('data', event => {
      const { _winningNumber, _winner, _rewardAmount } = event.returnValues;
      console.log(_winningNumber + ' : ' + _winner + ' : ' + _rewardAmount);
    });
  }
}
