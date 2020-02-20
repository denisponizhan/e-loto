pragma solidity >=0.4.21 <0.7.0;

contract E_loto {
    constructor() public {}

    uint256 constant maxPlayers = 10;
    uint256 constant fee = 15000000000000000;

    struct Game {
        mapping(address => bool) isAlreadyBet;
        Staker[] stakers;
        address[] winners;
        uint256 counter;
        bytes winningNumber;
        uint256 stakesTotal;
        bool isEnd;
    }

    struct Staker {
        address account;
        uint8 bet;
    }

    mapping(address => uint256) public balances;

    Game public game;

    modifier onlyValidBet(uint8 _bet) {
        require(_bet < 10, "Bet is'n valid");
        _;
    }

    function placeStake(uint8 _bet) public payable onlyValidBet(_bet) {
        require(!game.isEnd, "There is no place for one more bet");
        require(
            msg.value == 15000000000000000,
            "Stake must be equal 0.015 ether"
        );
        require(
            !game.isAlreadyBet[msg.sender],
            "You have already placed your bet"
        );
        game.isAlreadyBet[msg.sender] = true;
        game.counter = game.counter + 1;
        game.stakesTotal = game.stakesTotal + msg.value;
        game.stakers.push(Staker(msg.sender, _bet));

        if (game.counter == maxPlayers) {
            game.isEnd = true;
            // emit event
        }
    }

    function determineWinners() public returns (bool) {
        require(game.isEnd, "Game is not end");
        uint256 winningNumber = generateWinningMumber();

        for (uint256 i = 0; i < game.stakers.length; i++) {
            if (game.stakers[i].bet == winningNumber) {
                game.winners.push(game.stakers[i].account);
            }
        }

        if (game.winners.length == 0) {
            return true;
        } else {
            uint256 rewardAmount = determineRewardAmount(game.winners.length);

            for (uint256 j = 0; j < game.winners.length; j++) {
                balances[game.winners[j]] = rewardAmount;
            }

            return true;
        }
    }

    function withdraw() public {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(amount);
    }

    function determineRewardAmount(uint256 _winnersAmount)
        private
        view
        returns (uint256)
    {
        require(_winnersAmount != 0, "Winners amount can not be equal to zero");
        return ((game.stakesTotal - fee) / _winnersAmount);
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

    function getWinners() public view returns (address[] memory) {
        return game.winners;
    }

}
