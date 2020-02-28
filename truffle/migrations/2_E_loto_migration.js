const E_loto = artifacts.require('E_loto');

module.exports = function(deployer) {
  const gameInterval = 10;
  deployer.deploy(E_loto, gameInterval);
};
