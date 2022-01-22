const robotToken = artifacts.require("./Robot_Token.sol");

module.exports = function(deployer) {
  deployer.deploy(robotToken);
};
