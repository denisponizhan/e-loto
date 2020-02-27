export default class ElotoService {
  constructor(contract) {
    this.contract = contract;
  }

  async getScheduledBlock() {
    return this.contract.methods.scheduledBlock().call();
  }

  determineWinners() {
    return this.contract.methods.determineWinners();
  }
}
