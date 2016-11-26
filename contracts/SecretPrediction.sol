pragma solidity ^0.4.2;
import './Util.sol';

contract SecretPrediction is Util{
	string public question;
	string public answer;
	address public owner;
	uint public total_balance;
	uint public deposit;

	struct Choice {
		bytes32 encrypted_choice;
		string choice;
 	}

	mapping(address => Choice) public choices;
	mapping(string => uint) answers;

	function SecretPrediction(string _question){
		question = _question;
		deposit = 1 ether;
		owner = msg.sender;
	}

	modifier correctDeposit{
		if(msg.value != deposit) throw;
		_;
	}

	modifier onlyOwner{
		if(msg.sender != owner) throw;
		_;
	}

	modifier noAnswerReported{
		if(strCompare(answer, '') != 0) throw;
		_;
	}

	modifier answerReported{
		if(strCompare(answer, '') == 0) throw;
		_;
	}

	function submit(bytes32 _encrypted_choice) payable correctDeposit{
		if(_encrypted_choice == 0) throw;
		choices[msg.sender] = Choice(_encrypted_choice, '');
		total_balance+= msg.value;
	}

	function open(string nonce, string choice) noAnswerReported{
		var choiceStruct = choices[msg.sender];
		var _encrypted_choice = sha3(strConcat(nonce, choice));
		if(choiceStruct.encrypted_choice != _encrypted_choice){
			throw;
		}
		choiceStruct.choice = choice;
		answers[choice]+=1;
	}
	function myChoice() returns(string){
		return choices[msg.sender].choice;
	}

	function myReward() answerReported returns(uint){
		if(strCompare(answer, choices[msg.sender].choice) == 0){
			return getPayout();
		}else{
			return 0;
		}
	}

	function getPayout() returns(uint){
		return total_balance / answers[answer];
	}

	function getLeftOver() returns(uint){
		return total_balance - (getPayout() * answers[answer]);
	}

	/* assumption: everybody has opened their choice*/
	function report(string _answer) onlyOwner{
		answer = _answer;
		if(strCompare(answer, '') == 0) throw;
		if(!msg.sender.send(getLeftOver())) throw;
	}

	function withdraw(){
		var _reward = myReward();
		if(_reward != 0){
			if(!msg.sender.send(_reward)) throw;
		}
	}
}
