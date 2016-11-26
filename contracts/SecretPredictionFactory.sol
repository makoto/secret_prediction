pragma solidity ^0.4.2;
import './SecretPrediction.sol';
import './zeppelin/Ownable.sol';

contract SecretPredictionFactory is Ownable{
  address[] predictions;

  event predictionCreatedEvent(address predictionAddress);
	function create(string question) onlyOwner{
    var predictionAddress = new SecretPrediction(question);
    predictions.push(predictionAddress);
    predictionCreatedEvent(predictionAddress);
  }

  function numPredictions() returns(uint){
    return predictions.length;
  }
}
