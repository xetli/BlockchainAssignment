require('dotenv').config()

const mnemonic = process.env.MNEMONIC_PASSWORD;
const RinkebyEndPoint = process.env.RINKEBY_END_POINT;
const RinkebyWSEndPoint =  process.env.RINKEBY_WS_END_POINT;

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(mnemonic,RinkebyWSEndPoint)
      },
      network_id : 4,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  },
  compilers: {
    solc: {
      version: '0.8.0',
      parser: 'solcjs'
    }
  }
};
