const E_loto = artifacts.require('E_loto');

module.exports = function(deployer) {
  const gameInterval = '300'; // Game intervval in Seconds. Is is an interval between oraclise calls.
  const provableCustomGasLimit = '500000';
  deployer.deploy(E_loto, gameInterval, provableCustomGasLimit, {
    value: web3.utils.toWei('1', 'ether')
  });
};
