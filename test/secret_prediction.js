contract('SecretPredictionFactory', function(accounts) {
  describe('create', function(){
    it("increments number of predictions", function(done) {
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

    it("creates new prediction", function(done){
      var question = 'Does Trump win US election?'
      var factory = SecretPredictionFactory.deployed();
      var event = factory.predictionCreatedEvent();
      event.watch(function(err, result) {
        event.stopWatching();
        var prediction = SecretPrediction.at(result.args.predictionAddress)
        prediction.question.call().then(function(q){
          assert.equal(q, question);
        }).then(done)
      });
      factory.create(question)
    })
  })
});
