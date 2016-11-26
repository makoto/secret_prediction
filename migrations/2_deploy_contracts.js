module.exports = function(deployer) {
  deployer.deploy(SecretPredictionFactory);
  deployer.autolink();
};
