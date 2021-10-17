// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract Quiz {
	address payable deployer;
	uint256 stake;

	event ContributionRecieved(address indexed player, uint256 stake);
	event PayoutSuccessful(address payable winner, uint256 payoutAmount);

	constructor(uint256 _stake) {
		deployer = payable(msg.sender);
		stake = _stake;
	}

	receive() external payable {
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
		uint256 payoutAmount = currentBalance - fees;

		(bool dSent, ) = deployer.call{value: fees}("");
		require(dSent, "Failed to send fees to deployer");

		(bool wSent, ) = winner.call{value: payoutAmount}("");
		require(wSent, "Failed to send ether to winner");

		emit PayoutSuccessful(winner, payoutAmount);
	}
}

