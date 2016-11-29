var Tempo = require('@digix/tempo').default

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
      var yes = 'yes';
      var no = 'no';
      var encrypted_yes_choice = web3.sha3(nonce + yes);
      var encrypted_no_choice = web3.sha3(nonce + no);
      var administrator = accounts[0]
      var a_day = 1 * 60 * 60 * 24 // 1 day
      var eight_days = a_day * 8;
      var three_days = a_day * 3;

      var tempo;
      new Tempo(web3).then(function(_tempo){
        tempo = _tempo;
        return SecretPrediction.new(question, {from:administrator})
      }).then(function(_prediction){
        prediction = _prediction;
        return prediction.submit(encrypted_yes_choice, {value:deposit, from:accounts[1]})
      }).then(function(){
        return prediction.submit(encrypted_yes_choice, {value:deposit, from:accounts[2]})
      }).then(function(){
        return prediction.submit(encrypted_yes_choice, {value:deposit, from:accounts[3]})
      }).then(function(){
        return prediction.submit(encrypted_no_choice, {value:deposit, from:accounts[4]})
      }).then(function(){
        assert.equal(web3.eth.getBalance(prediction.address).toNumber(), web3.toWei(4));
        return tempo.waitForBlocks(1, eight_days);
      }).then(function(){
        return prediction.open(nonce, yes, {from:accounts[1]})
      }).then(function(){
        return prediction.open(nonce, yes, {from:accounts[2]})
      }).then(function(){
        return prediction.open(nonce, yes, {from:accounts[3]})
      }).then(function(){
        return prediction.open(nonce, no, {from:accounts[4]})
      }).then(function(){
        return tempo.waitForBlocks(1, three_days);
      }).then(function(){
        return prediction.report('yes', {from:administrator})
      }).then(function(){
        return prediction.myReward.call({from:accounts[1]})
      }).then(function(reward){
        assert.equal(reward.toNumber(), 1333333333333333200);
        return prediction.withdraw({from:accounts[1]})
      }).then(function(){
        return prediction.myReward.call({from:accounts[2]})
      }).then(function(reward){
        assert.equal(reward.toNumber(), 1333333333333333200);
        return prediction.withdraw({from:accounts[2]})
      }).then(function(){
        return prediction.myReward.call({from:accounts[3]})
      }).then(function(reward){
        assert.equal(reward.toNumber(), 1333333333333333200);
        return prediction.withdraw({from:accounts[3]})
      }).then(function(){
        return prediction.myReward.call({from:accounts[4]})
      }).then(function(reward){
        assert.equal(reward, 0);
        assert.equal(web3.eth.getBalance(prediction.address).toNumber(), 0);
      }).then(done);
    });
  })

  describe('incorrect path', function(){
    it("does not submit after submit period", function(done){
      var deposit = web3.toWei(1);
      var prediction;
      var a_day = 1 * 60 * 60 * 24 // 1 day
      var eight_days = a_day * 8;
      var tempo;
      new Tempo(web3).then(function(_tempo){
        tempo = _tempo;
        return SecretPrediction.new('q')
      }).then(function(_prediction){
        prediction = _prediction;
        return tempo.waitForBlocks(1, eight_days);
      }).then(function(_prediction){
        return prediction.submit('encrypted choice', {value:deposit})
      }).catch(function(error){
        assert.equal(web3.eth.getBalance(prediction.address).toNumber(), 0);
      }).then(done);
    })

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

    it("does not allow zero encrypted choice to be set", function(done){
      var deposit = web3.toWei(1);
      var prediction;
      SecretPrediction.new('q').then(function(_prediction){
        prediction = _prediction;
        return prediction.submit(0, {value:deposit})
      }).catch(function(error){
        assert.equal(web3.eth.getBalance(prediction.address).toNumber(), 0);
      }).then(done);
    })

    it("can not open my choice if same nonce is not passed", function(done) {
      var deposit = web3.toWei(1);
      var question = 'Does Trump win US election?';
      var prediction;
      var choice = 'yes';
      var encrypted_choice = web3.sha3(getNonce() + choice);
      var tempo;
      var a_day = 1 * 60 * 60 * 24 // 1 day
      var eight_days = a_day * 8;
      new Tempo(web3).then(function(_tempo){
        tempo = _tempo;
        return SecretPrediction.new(question)
      }).then(function(_prediction){
        prediction = _prediction;
        prediction.submit(encrypted_choice, {value:deposit})
      }).then(function(){
        return tempo.waitForBlocks(1, eight_days);
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
