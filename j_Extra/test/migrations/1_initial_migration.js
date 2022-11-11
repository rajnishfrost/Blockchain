const HTLC = artifacts.require('HTLC.sol');
const tokenA = artifacts.require('../build/contract/Token.sol');

module.exports = function(deployer) {
  deployer.deploy(HTLC, "0xCB1725C97b32A3c9FB44dC3500f8E4b0743d479a", tokenA.address, 0.1);
};
