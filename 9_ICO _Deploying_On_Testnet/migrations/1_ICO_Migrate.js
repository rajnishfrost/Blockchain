const ICO = artifacts.require("ICO");
module.exports = function(deployer) {
  deployer.deploy(ICO , 10);
};
