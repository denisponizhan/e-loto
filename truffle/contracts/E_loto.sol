pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./provableAPI.sol";

contract E_loto is Ownable, usingProvable {
    using SafeMath for uint256;

    uint256 public gameIntervalInSeconds;
    uint256 public provableCustomGasLimit;
    uint256 public contractBounty;
    bytes32 public gameId;

    struct Game {
        mapping(address => bool) isAlreadyBet;
        Staker[] stakers;
        address[] winners;
        uint256 stakesTotal;
        bool isClosed;
    }

    struct Staker {
        address account;
        uint8 bet;
    }

    mapping(address => uint256) public balances;
    mapping(bytes32 => Game) public games;
    mapping(bytes32 => bool) public pendingQueries;

    event NewStake(address indexed _staker, uint8 indexed _bet);
    event NewWinner(
        uint8 indexed _winningNumber,
        address _winner,
        uint256 _rewardAmount
    );
    event NoWinners(string _description, uint8 _winningNumber);
    event NewProvableQuery(string _description);
    event NoStakes(string _description);

    modifier onlyValidBet(uint8 _bet) {
        require(_bet < 10, "Bet is'n valid");
        _;
    }

    modifier onlySystem() {
        require(
            msg.sender == provable_cbAddress() ||
                msg.sender == address(this) ||
                msg.sender == address(uint160(owner())),
            "You don't have permission to complete this action"
        );
        _;
    }

    // function() external payable {}

    constructor(uint256 _gameIntervalInSeconds, uint256 _provableCustomGasLimit)
        public
        payable
    {
        gameIntervalInSeconds = _gameIntervalInSeconds;
        provableCustomGasLimit = _provableCustomGasLimit;

        queryNextWinningNumber();
    }

    function __callback(bytes32 _queryId, string memory _resultRandom) public {
        require(
            msg.sender == provable_cbAddress(),
            "Only provable API is able to process this function"
        );
        require(pendingQueries[_queryId] == true, "Query has been processed");

        uint8 winningNumber = uint8(safeParseInt(_resultRandom));
        processGame(winningNumber);

        queryNextWinningNumber();
        delete pendingQueries[_queryId];
    }

    function queryNextWinningNumber() public payable onlySystem {
        if (
            provable_getPrice("WolframAlpha", provableCustomGasLimit) >
            address(this).balance
        ) {
            emit NewProvableQuery(
                "Provable query was NOT sent, please add some ETH to cover for the query fee"
            );
        } else {
            gameId = provable_query(
                gameIntervalInSeconds,
                "WolframAlpha",
                "random number between 0 and 9",
                provableCustomGasLimit
            );

            emit NewProvableQuery(
                "Provable query was sent, random number was requested, standing by for the answer..."
            );

            pendingQueries[gameId] = true;
        }
    }

    function placeStake(uint8 _bet) public payable onlyValidBet(_bet) {
        require(
            msg.value == 15000000000000000,
            "Stake must be equal 0.015 ether"
        );

        Game storage game = games[gameId];

        require(!game.isClosed, "Game is closed");
        require(
            !game.isAlreadyBet[msg.sender],
            "You have already placed your bet"
        );

        game.isAlreadyBet[msg.sender] = true;
        game.stakesTotal = game.stakesTotal.add(msg.value);
        game.stakers.push(Staker(msg.sender, _bet));
        emit NewStake(msg.sender, _bet);
    }

    function processGame(uint8 _winningNumber) private {
        Game storage game = games[gameId];
        game.isClosed = true;

        if (game.stakesTotal == 0) {
            emit NoStakes("No stakes in this game!");
            return;
        }

        uint256 winnersAmount = determineAmountOfWinners(
            game.stakers,
            _winningNumber
        );

        uint256 provableFee = provable_getPrice(
            "WolframAlpha",
            provableCustomGasLimit
        );

        uint256 stakesToReward = game.stakesTotal.sub(provableFee);

        if (winnersAmount > 0) {
            uint256 rewardAmount = determineRewardAmount(
                stakesToReward,
                winnersAmount
            );

            increaseBalanceIfWinner(game.stakers, rewardAmount, _winningNumber);

        } else {
            contractBounty = contractBounty.add(stakesToReward);
            emit NoWinners("No winners in this game!", _winningNumber);
        }
    }

    function determineAmountOfWinners(
        Staker[] storage _stakers,
        uint8 _winningNumber
    ) private view returns (uint256) {
        uint256 j;
        for (uint256 i = 0; i < _stakers.length; i++) {
            if (_stakers[i].bet == _winningNumber) {
                j++;
            }
        }
        return j;
    }

    function determineRewardAmount(uint256 _stakesTotal, uint256 _winnersAmount)
        private
        pure
        returns (uint256)
    {
        require(_winnersAmount != 0, "Winners amount can not be equal to zero");
        return _stakesTotal.div(_winnersAmount);
    }

    function increaseBalanceIfWinner(
        Staker[] storage _stakers,
        uint256 _rewardAmount,
        uint8 _winningNumber
    ) private {
        for (uint256 i = 0; i < _stakers.length; i++) {
            if (_stakers[i].bet == _winningNumber) {
                balances[_stakers[i].account] = _rewardAmount;
                emit NewWinner(
                    _winningNumber,
                    _stakers[i].account,
                    _rewardAmount
                );
            }
        }
    }

    function updateGameInterval(uint256 _gameIntervalInSeconds)
        public
        onlyOwner
    {
        gameIntervalInSeconds = _gameIntervalInSeconds;
    }

    function updateProvableCustomGasLimit(uint256 _provableCustomGasLimit)
        public
        onlyOwner
    {
        provableCustomGasLimit = _provableCustomGasLimit;
    }

    function withdraw() public {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(amount);
    }

    function withdrawBounty() public onlyOwner {
        uint256 amount = contractBounty;
        contractBounty = 0;
        address(uint160(owner())).transfer(amount);
    }
}
