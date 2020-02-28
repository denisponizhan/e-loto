import EventEmitter from 'events';

export default class BlockListener extends EventEmitter {
  constructor(web3) {
    super();
    this.web3 = web3;
    this.scheduledBlock = null;
  }

  isScheduledBlock(currentBlockNumber, scheduledBlock) {
    return parseInt(currentBlockNumber) >= parseInt(scheduledBlock);
  }

  setScheduledBlock(block) {
    this.scheduledBlock = block;
  }

  listen() {
    this.web3.eth.subscribe('newBlockHeaders', async (err, res) => {
      if (!err) {
        const currentBlockNumber = parseInt(res.number);
        if (this.isScheduledBlock(currentBlockNumber, this.scheduledBlock)) {
          this.emit('scheduled');
        }
      } else {
        console.error(err);
      }
    });
  }
}
