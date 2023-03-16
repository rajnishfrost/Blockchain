const Migrations = artifacts.require("CoinFlip");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
