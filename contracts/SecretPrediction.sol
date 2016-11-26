pragma solidity ^0.4.2;
import './Util.sol';

contract SecretPrediction is Util{
	string public question;
	struct Choice {
		bytes32 encrypted_choice;
		string choice;
 	}

	mapping(address => Choice) public choices;

	function SecretPrediction(string _question){
		question = _question;
	}

	function submit(bytes32 _encrypted_choice){
		choices[msg.sender] = Choice(_encrypted_choice, '');
	}
	function open(string nonce, string choice){
		var choiceStruct = choices[msg.sender];
		var _encrypted_choice = sha3(strConcat(nonce, choice));
		if(choiceStruct.encrypted_choice != _encrypted_choice){
			throw;
		}
		choiceStruct.choice = choice;
	}
	function myChoice() returns(string){
		return choices[msg.sender].choice;
	}
	function answer(string answer){}
	function withdraw(){}
}
