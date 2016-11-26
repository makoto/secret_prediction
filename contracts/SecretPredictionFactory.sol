pragma solidity ^0.4.2;
import './SecretPrediction.sol';

contract SecretPredictionFactory {
  /*struct Request {
   bytes data;
   function(bytes memory) external callback;
 }*/
  address[] predictions;

  event predictionCreatedEvent(address predictionAddress);
	function create(string question){
    var predictionAddress = new SecretPrediction(question);
    predictions.push(predictionAddress);
    predictionCreatedEvent(predictionAddress);
  }

  function numPredictions() returns(uint){
    return predictions.length;
  }
}
