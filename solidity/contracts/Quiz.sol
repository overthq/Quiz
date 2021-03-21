// SPDX-License-Identifier: GNU-GPLv3
pragma solidity ^0.7.0;
import "../node_modules/@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

enum GameStatus {Funding, Started, Ended}

contract Quiz is ChainlinkClient {
    bytes32 gameId;
    address[] participants;
    mapping(address => uint256) public stakes;
    GameStatus status;

    uint256 prizeFund;
    uint256 minimumStake;
    uint256 maximumStake;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor(
        bytes32 _gameId,
        uint256 _prizeFund,
        uint256 _minimumStake,
        uint256 _maximumStake
    ) public {
        setPublicChainlinkToken();

        oracle = 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e;
        jobId = "29fa9aa13bf1468788b7cc4a500a45b8";
        fee = 0.1 * 10 ** 18;

        gameId = _gameId;
        prizeFund = _prizeFund;
        status = GameStatus.Funding;


        if (_minimumStake) minimumStake = _minimumStake;
        if (_maximumStake) maximumStake = _maximumStake;
    }

    function contributeToPrizeFund() external payable {
        uint256 currentBalance = (address(this)).balance;

        require(msg.value < (prizeFund - currentBalance));

        participants.push(msg.sender);
        stakes[msg.sender] = msg.value;

        if ((currentBalance + msg.value) == prizeFund) {
            status = GameStatus.Started;
        }
    }

    function requestWinner() public returns (bytes32 requestId) {
        Chainlink.Request memory request =
            buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add(
            "get",
            "https://api.quiz.dev/game?gameId=" + gameId + "/winner"
        );

        request.add("path", "data.message");

        if (status == GameStatus.Finished && winner) {
            address(uint160(msg.sender)).transfer((address(this)).balance);
        }

        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function payout(bytes32 _requestId, bytes32 _winner)
        public
        recordChainlinkFulfillment(_requestId)
    {
        address(uint160(_winner)).transfer((address(this)).balance);
    }
}
