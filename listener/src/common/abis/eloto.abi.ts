export default [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_gameIntervalInSeconds',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_provableCustomGasLimit',
        type: 'uint256'
      }
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_gameId',
        type: 'bytes32'
      }
    ],
    name: 'NewGameId',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: '_description',
        type: 'string'
      }
    ],
    name: 'NewProvableQuery',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_gameId',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_staker',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: '_bet',
        type: 'uint8'
      }
    ],
    name: 'NewStake',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_gameId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_winner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_rewardAmount',
        type: 'uint256'
      }
    ],
    name: 'NewWinner',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_gameId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: '_winningNumber',
        type: 'uint8'
      }
    ],
    name: 'NewWinningNumber',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_gameId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'string',
        name: '_description',
        type: 'string'
      }
    ],
    name: 'NoStakes',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_gameId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'string',
        name: '_description',
        type: 'string'
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: '_winningNumber',
        type: 'uint8'
      }
    ],
    name: 'NoWinners',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'balances',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'contractBounty',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'gameId',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'gameIntervalInSeconds',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'games',
    outputs: [
      {
        internalType: 'uint256',
        name: 'stakesTotal',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'isClosed',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'isOwner',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'pendingQueries',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'provableBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'provableCustomGasLimit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_queryId',
        type: 'bytes32'
      },
      {
        internalType: 'string',
        name: '_resultRandom',
        type: 'string'
      }
    ],
    name: '__callback',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_myid',
        type: 'bytes32'
      },
      {
        internalType: 'string',
        name: '_result',
        type: 'string'
      },
      {
        internalType: 'bytes',
        name: '_proof',
        type: 'bytes'
      }
    ],
    name: '__callback',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'queryNextWinningNumber',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint8',
        name: '_bet',
        type: 'uint8'
      }
    ],
    name: 'placeStake',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_gameIntervalInSeconds',
        type: 'uint256'
      }
    ],
    name: 'updateGameInterval',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_provableCustomGasLimit',
        type: 'uint256'
      }
    ],
    name: 'updateProvableCustomGasLimit',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'withdrawBounty',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
