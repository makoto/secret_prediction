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
});
