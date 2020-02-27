import config from '../config';
import ElotoService from './elotoService';

export default class Web3Service {
  constructor(web3) {
    this.web3 = web3;
    this.contract = null;
    this.isUnderTransaction = false;
    this.scheduledBlock = null;
  }

  setUpContract(abi, address) {
    const contractInstance = new this.web3.eth.Contract(abi, address);
    this.contract = new ElotoService(contractInstance);
  }

  async getScheduledBlock() {
    this.scheduledBlock = await this.contract.getScheduledBlock();
  }

  startListener() {
    this.web3.eth.subscribe('newBlockHeaders', async (err, res) => {
      if (!err) {
        const currentBlockNumber = parseInt(res.number);

        if (
          parseInt(currentBlockNumber) >= parseInt(this.scheduledBlock) &&
          !this.isUnderTransaction
        ) {
          try {
            this.isUnderTransaction = true;

            const { ethereum } = config;

            const tx_builder = this.contract.determineWinners();
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

            this.scheduledBlock = await this.contract.getScheduledBlock();
            this.isUnderTransaction = false;
          } catch (e) {
            console.log(e);
          }
        }
        return;
      } else {
        console.error(err);
      }
    });
  }
}
