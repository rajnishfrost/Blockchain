const HTLC = artifacts.require('HTLC.sol');
const tokenA = artifacts.require('../build/contract/Token.sol');

module.exports = function(deployer) {
  deployer.deploy(HTLC, "0x864C42Cce5180b7f48CeaA36672Ea698A8334248", tokenA.address, 0.2);
};
