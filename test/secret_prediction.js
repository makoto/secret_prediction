function getNonce(){
  return Math.random().toString(36).replace(/0./, '');
}

contract('SecretPrediction', function(accounts) {
  describe('correct path', function(){
    it("reveals my choice only after opened", function(done) {
      var deposit = web3.toWei(1);
      var question = 'Does Trump win US election?';
      var prediction;
      var nonce = getNonce();
      var choice = 'yes';
      var encrypted_choice = web3.sha3(nonce + choice);
      SecretPrediction.new(question).then(function(_prediction){
        prediction = _prediction;
        prediction.submit(encrypted_choice, {value:deposit})
      })
      .then(function(){
        prediction.open(nonce, choice)
      }).then(function(){
        return prediction.myChoice.call()
      }).then(function(c){
        assert.equal(c, choice);
      }).then(done);
    });
  })

  describe('incorrect path', function(){
    it("does not allow incorrect deposit to be sent", function(done){
      var incorrectDeposit = web3.toWei(2);
      var prediction;
      SecretPrediction.new('q').then(function(_prediction){
        prediction = _prediction;
        return prediction.submit('encrypted choice', {value:incorrectDeposit})
      }).catch(function(error){
        assert.equal(web3.eth.getBalance(prediction.address).toNumber(), 0);
      }).then(done);
    })

    it("does not reveal my choice if same nonce is not passed", function(done) {
      var deposit = web3.toWei(1);
      var question = 'Does Trump win US election?';
      var prediction;
      var choice = 'yes';
      var encrypted_choice = web3.sha3(getNonce() + choice);
      SecretPrediction.new(question).then(function(_prediction){
        prediction = _prediction;
        prediction.submit(encrypted_choice, {value:deposit})
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
