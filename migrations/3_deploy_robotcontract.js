var robotContract = artifacts.require("./RobotContract.sol");

module.exports = function(deployer) {
  deployer.deploy(robotContract);
};
