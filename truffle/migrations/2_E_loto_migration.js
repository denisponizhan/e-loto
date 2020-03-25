const E_loto = artifacts.require('E_loto');

module.exports = function(deployer) {
  const gameInterval = '60'; // Game intervval in Seconds. Is is an interval between oraclise calls.
  const provableCustomGasLimit = '500000';
  deployer.deploy(E_loto, gameInterval, provableCustomGasLimit, {
    value: web3.utils.toWei('0.1', 'ether')
  });
};
