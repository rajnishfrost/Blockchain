const Migrations = artifacts.require("helloWorld");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
