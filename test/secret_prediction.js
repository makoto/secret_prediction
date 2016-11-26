function getNonce(){
  return Math.random().toString(36).replace(/0./, '');
}

contract('SecretPrediction', function(accounts) {
  describe('submit', function(){
    it("reveals my choice only after opened", function(done) {
      var question = 'Does Trump win US election?';
      var prediction;
      var nonce = getNonce();
      var choice = 'yes';
      var encrypted_choice = web3.sha3(nonce + choice);
      SecretPrediction.new(question).then(function(_prediction){
        prediction = _prediction;
        prediction.submit(encrypted_choice)
      })
      .then(function(){
        prediction.open(nonce, choice)
      }).then(function(){
        return prediction.myChoice.call()
      }).then(function(c){
        assert.equal(c, choice);
      }).then(done);
    });

    it.only("does not reveal my choice if same nonce is not passed", function(done) {
      var question = 'Does Trump win US election?';
      var prediction;
      var choice = 'yes';
      var encrypted_choice = web3.sha3(getNonce() + choice);
      SecretPrediction.new(question).then(function(_prediction){
        prediction = _prediction;
        prediction.submit(encrypted_choice)
      }).then(function(){
        return prediction.open(getNonce(), choice)
      }).then(function(){
        throw {name : "NoThrowError", message : "should not come here"};
      }).catch(function(error){
        assert.notEqual(error.name, "NoThrowError");
      }).then(function(){
        return prediction.myChoice.call()
      }).then(function(c){
        assert.notEqual(c, choice);
      }).then(done);
    });
  })
});
