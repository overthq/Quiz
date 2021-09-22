// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.0;

contract Quiz {
	address payable deployer;
	uint256 stake;

	event ContributionRecieved(address indexed player, uint256 stake);

	constructor(uint256 _stake) {
		deployer = payable(msg.sender);
		stake = _stake;
	}

	receive () external payable {
		require(
			msg.value == stake,
			'All players have to contribute the same amount'
		);
		emit ContributionRecieved(msg.sender, stake);
	}

	function payout(address payable winner) public {
		require(payable(msg.sender) == deployer, 'Only the deployer can trigger the payout');

		uint256 currentBalance = (address(this)).balance;
		uint256 fees = currentBalance / 20;

		(bool dSent, bytes memory dData) = deployer.call{value: fees}("");
		require(dSent, "Failed to send fees to deployer");

		(bool wSent, bytes memory wData) = winner.call{value: currentBalance - fees}("");
		require(wSent, "Failed to send ether to winner");
	}

}

