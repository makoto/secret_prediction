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
      function jump(time){
        var params = {
          jsonrpc: "2.0",
          method: "evm_increaseTime",
          params: [time],
          id: new Date().getTime()
        }

        return new Promise(function(resolve,reject){
          web3.currentProvider.sendAsync(params, function(err, result){
            resolve(result)
          });
        });
      }

      var time = 1 * 60 * 60 * 24 // 1 day
      var beforeJump;

      Util.new().then(function(_util){
        util = _util;
        return util.getTime.call();
      }).then(function(_time){
        beforeJump = _time;
        console.log('time', _time)
        return jump(time)
      }).then(function(){
        return util.getTime.call();
      }).then(function(_time){
        console.log('time', _time)
        assert.equal(_time - beforeJump, time)
      }).then(done);
    })
  })
});
