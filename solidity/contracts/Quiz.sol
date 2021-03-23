// SPDX-License-Identifier: GNU-GPLv3
pragma solidity ^0.7.0;

contract Quiz {
	address deployer;
	uint256 stake;

	constructor(uint256 _stake) public {
		deployer = msg.sender;
		stake = _stake;
	}

	function contributeToPrizeFund() external payable {
		require(msg.value == stake, "All players have to contribute the same amount");
	}

	function payout(bytes32 winner) {
		require(msg.sender == deployer, "Only the deployer can trigger the payout");
		address(uint160(deployer)).transfer((0.05 * address(this)).balance);
		address(uint160(winner)).transfer((address(this)).balance);
	}
}
