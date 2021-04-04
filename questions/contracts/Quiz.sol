// SPDX-License-Identifier: GNU-GPLv3
pragma solidity ^0.7.0;

contract Quiz {
	address payable deployer;
	uint256 stake;

	constructor(uint256 _stake) {
		deployer = msg.sender;
		stake = _stake;
	}

	function contributeToPrizeFund() external payable {
		require(
			msg.value == stake,
			'All players have to contribute the same amount'
		);
	}

	function payout(address payable winner) public {
		require(msg.sender == deployer, 'Only the deployer can trigger the payout');

		uint256 currentBalance = (address(this)).balance;
		uint256 fees = currentBalance / 20;

		address(uint160(deployer)).transfer(fees);
		address(uint160(winner)).transfer(currentBalance - fees);
	}
}
