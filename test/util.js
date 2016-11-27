var Tempo = require('@digix/tempo').default
contract('Util', function(accounts) {
  describe('strConcat', function(){
    it("concatenates", function(done) {
      Util.new().then(function(util){
        return util.strConcat.call('hello', 'world');
      }).then(function(result){
        assert.equal(result, 'helloworld');
      }).then(done);
    });
  });

  describe('strCompare', function(){
    it("compares", function(done) {
      var util;
      Util.new().then(function(_util){
        util = _util;
        return util.strCompare.call('hello', 'world');
      }).then(function(result){
        assert.notEqual(result.toNumber(), 0);
      }).then(function(){
        return util.strCompare.call('hello', 'hello');
      }).then(function(result){
        assert.equal(result.toNumber(), 0);
      }).then(done);
    });
  });

  describe('getTime', function(){
    it.only("returns time", function(done) {

      var a_day = 1 * 60 * 60 * 24 // 1 day
      var beforeJump;
      var tempo;
      new Tempo(web3).then(function(_tempo){
        tempo = _tempo;
        return Util.new();
      }).then(function(_util){
        util = _util;
        return util.getTime.call();
      }).then(function(_time){
        beforeJump = _time;
        console.log('block', web3.eth.getBlock('latest').number);
        console.log('time', _time)
        return tempo.waitForBlocks(1, a_day);
      }).then(function(){
        return util.getTime.call();
      }).then(function(_time){
        console.log('block', web3.eth.getBlock('latest').number);
        console.log('time', _time)
        assert.equal(_time - beforeJump, a_day)
      }).then(done);
    })
  })
});
