pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract E_loto {
    using SafeMath for uint256;

    uint256 constant gameInterval = 10000;

    uint256 blockNumber;
    bytes32 gameId;

    struct Game {
        mapping(address => bool) isAlreadyBet;
        Staker[] stakers;
        address[] winners;
        uint256 stakesTotal;
    }

    struct Staker {
        address account;
        uint8 bet;
    }

    mapping(address => uint256) public balances;
    mapping(bytes32 => Game) public games;

    event PlaceStake(address indexed _staker, uint8 indexed _bet);
    event DetermineWinningNumber(
        uint8 indexed _winningNumber,
        uint256 indexed _blockNumber,
        bates32 indexed nextGameId
    );

    modifier onlyValidBet(uint8 _bet) {
        require(_bet < 10, "Bet is'n valid");
        _;
    }

    constructor() public {
        blockNumber = block.number;
    }

    function placeStake(uint8 _bet) public payable onlyValidBet(_bet) {
        require(
            block.number < blockNumber.add(gameInterval),
            "There is no place for one more bet"
        );
        require(
            msg.value == 15000000000000000,
            "Stake must be equal 0.015 ether"
        );

        Game storage game = games[gameId];

        require(
            !game.isAlreadyBet[msg.sender],
            "You have already placed your bet"
        );

        game.isAlreadyBet[msg.sender] = true;
        game.stakesTotal = game.stakesTotal.add(msg.value);
        game.stakers.push(Staker(msg.sender, _bet));
        emit PlaceStake(msg.sender, _bet);
    }

    function determineWinners() public {
        require(
            block.number >= blockNumber.add(gameInterval),
            "Game is not end"
        );

        Game storage game = games[gameId];
        uint256 winningNumber = generateWinningMumber();

        for (uint256 i = 0; i < game.stakers.length; i++) {
            if (game.stakers[i].bet == winningNumber) {
                game.winners.push(game.stakers[i].account);
            }
        }

        if (game.winners.length > 0) {
            uint256 rewardAmount = determineRewardAmount(
                game.stakesTotal,
                game.winners.length
            );

            for (uint256 j = 0; j < game.winners.length; j++) {
                balances[game.winners[j]] = rewardAmount;
            }
        }

        blockNumber = block.number;
        gameId = keccak256(abi.encodePacked(blockNumber));
        emit DetermineWinningNumber(winningNumber, blockNumber, gameId);
    }

    function withdraw() public {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(amount);
    }

    function determineRewardAmount(uint256 _stakesTotal, uint256 _winnersAmount)
        private
        pure
        returns (uint256)
    {
        require(_winnersAmount != 0, "Winners amount can not be equal to zero");
        return _stakesTotal.div(_winnersAmount);
    }

    // TODO: find more secure way to generate random number
    function generateWinningMumber() private view returns (uint256) {
        return
            uint8(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            block.timestamp,
                            block.difficulty,
                            blockhash(block.number)
                        )
                    )
                ) %
                    9
            );
    }
}
