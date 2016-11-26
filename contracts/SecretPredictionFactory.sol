pragma solidity ^0.4.2;

contract SecretPredictionFactory {
  /*struct Request {
   bytes data;
   function(bytes memory) external callback;
 }*/
  string[] predictions;
	function create(string question){
    predictions.push(question);
  }

  function numPredictions() returns(uint){
    return predictions.length;
  }
}
