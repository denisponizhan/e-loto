const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic =
  'tank minor myth scan purse mean industry pool exercise kidney immune push';

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*'
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          'https://kovan.infura.io/v3/90ba383f66ba48388aff599d352cb73c',
          0,
          20
        );
      },
      network_id: 42
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          'https://ropsten.infura.io/v3/90ba383f66ba48388aff599d352cb73c',
          0,
          20
        );
      },
      network_id: 3
    }
  }
};
