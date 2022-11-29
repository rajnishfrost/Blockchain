const Migrations = artifacts.require("NFT_MarketPlace");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
