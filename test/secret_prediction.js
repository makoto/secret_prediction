contract('SecretPredictionFactory', function(accounts) {
  describe('create', function(){
    it("should increment number of predictions", function(done) {
      var factory = SecretPredictionFactory.deployed();
      factory.numPredictions.call().then(function(numPredictions) {
        assert.equal(numPredictions, 0);
      }).then(function(){
        factory.create('Does Trump win US election?')
      }).then(function(){
        return factory.numPredictions.call()
      }).then(function(numPredictions){
        assert.equal(numPredictions, 1);
      }).then(done);
    });
  })
});
