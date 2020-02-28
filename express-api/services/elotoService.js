import config from '../config';
import { abi } from '../../truffle/build/contracts/E_loto.json';

export default class ElotoService {
  constructor(web3) {
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
    this.contract.events.PlaceStake().on('data', event => {});
    this.contract.events.DetermineWinningNumber().on('data', event => {});
  }
}
