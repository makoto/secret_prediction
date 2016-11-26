pragma solidity ^0.4.2;

contract SecretPrediction {
	string public question;

	function SecretPrediction(string _question){
		question = _question;
	}

	function submit(string encrypted_choice){}
	function open(string nonce, string choice){}
	function answer(string answer){}
	function withdraw(){}
}
