export const WaveHarnessABI = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "__creationCodeHash",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "__self",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "computeNounsDelegationDigest",
    inputs: [
      { name: "signer", type: "address", internalType: "address" },
      { name: "delegateId", type: "uint256", internalType: "uint256" },
      { name: "expiry", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "digest", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createDelegate",
    inputs: [],
    outputs: [{ name: "delegate", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "delegateBySig",
    inputs: [
      {
        name: "waveSig",
        type: "tuple",
        internalType: "struct IWave.WaveSignature",
        components: [
          { name: "signer", type: "address", internalType: "address" },
          { name: "delegateId", type: "uint256", internalType: "uint256" },
          { name: "numNouns", type: "uint256", internalType: "uint256" },
          { name: "nonce", type: "uint256", internalType: "uint256" },
          { name: "expiry", type: "uint256", internalType: "uint256" },
          { name: "signature", type: "bytes", internalType: "bytes" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deleteDelegations",
    inputs: [
      { name: "_indices", type: "uint256[]", internalType: "uint256[]" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "disqualifiedDelegationIndices",
    inputs: [],
    outputs: [{ name: "", type: "uint256[]", internalType: "uint256[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "findDelegateId",
    inputs: [
      { name: "_minRequiredVotes", type: "uint256", internalType: "uint256" },
      { name: "_isSupplementary", type: "bool", internalType: "bool" },
    ],
    outputs: [{ name: "delegateId", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllEligibleProposerDelegates",
    inputs: [],
    outputs: [
      { name: "minRequiredVotes", type: "uint256", internalType: "uint256" },
      {
        name: "eligibleProposerIds",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllPartialDelegates",
    inputs: [],
    outputs: [
      { name: "minRequiredVotes", type: "uint256", internalType: "uint256" },
      {
        name: "partialDelegates",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCurrentMinRequiredVotes",
    inputs: [],
    outputs: [
      { name: "minRequiredVotes", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDelegateAddress",
    inputs: [{ name: "delegateId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "delegate", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDelegateIdByType",
    inputs: [
      { name: "minRequiredVotes", type: "uint256", internalType: "uint256" },
      { name: "isSupplementary", type: "bool", internalType: "bool" },
    ],
    outputs: [{ name: "delegateId", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getNextDelegateId",
    inputs: [],
    outputs: [
      { name: "nextDelegateId", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getOptimisticDelegations",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct IWave.Delegation[]",
        components: [
          { name: "delegator", type: "address", internalType: "address" },
          { name: "blockDelegated", type: "uint32", internalType: "uint32" },
          { name: "votingPower", type: "uint16", internalType: "uint16" },
          { name: "delegateId", type: "uint16", internalType: "uint16" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSuitableDelegateFor",
    inputs: [{ name: "nounder", type: "address", internalType: "address" }],
    outputs: [
      { name: "delegate", type: "address", internalType: "address" },
      { name: "minRequiredVotes", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ideaTokenHub",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract IIdeaTokenHub" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      { name: "ideaTokenHub_", type: "address", internalType: "address" },
      { name: "nounsGovernor_", type: "address", internalType: "address" },
      { name: "nounsToken_", type: "address", internalType: "address" },
      {
        name: "minSponsorshipAmount_",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "waveLength_", type: "uint256", internalType: "uint256" },
      { name: "uri", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isDisqualified",
    inputs: [
      { name: "_nounder", type: "address", internalType: "address" },
      { name: "_delegate", type: "address", internalType: "address" },
      { name: "_votingPower", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "_disqualify", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isEligibleProposalState",
    inputs: [
      { name: "_latestProposal", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "nounsGovernor",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract INounsDAOLogicV3" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "nounsToken",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IERC721Checkpointable",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "numEligibleProposerDelegates",
    inputs: [],
    outputs: [
      { name: "minRequiredVotes", type: "uint256", internalType: "uint256" },
      {
        name: "numEligibleProposers",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "proxiableUUID",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pushProposals",
    inputs: [
      {
        name: "winningProposals",
        type: "tuple[]",
        internalType: "struct IWave.Proposal[]",
        components: [
          {
            name: "ideaTxs",
            type: "tuple",
            internalType: "struct NounsDAOV3Proposals.ProposalTxs",
            components: [
              { name: "targets", type: "address[]", internalType: "address[]" },
              { name: "values", type: "uint256[]", internalType: "uint256[]" },
              {
                name: "signatures",
                type: "string[]",
                internalType: "string[]",
              },
              { name: "calldatas", type: "bytes[]", internalType: "bytes[]" },
            ],
          },
          { name: "description", type: "string", internalType: "string" },
        ],
      },
    ],
    outputs: [
      {
        name: "delegations",
        type: "tuple[]",
        internalType: "struct IWave.Delegation[]",
        components: [
          { name: "delegator", type: "address", internalType: "address" },
          { name: "blockDelegated", type: "uint32", internalType: "uint32" },
          { name: "votingPower", type: "uint16", internalType: "uint16" },
          { name: "delegateId", type: "uint16", internalType: "uint16" },
        ],
      },
      {
        name: "nounsProposalIds",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "registerDelegation",
    inputs: [
      { name: "nounder", type: "address", internalType: "address" },
      { name: "delegateId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setOptimisticDelegation",
    inputs: [
      {
        name: "_delegation",
        type: "tuple",
        internalType: "struct IWave.Delegation",
        components: [
          { name: "delegator", type: "address", internalType: "address" },
          { name: "blockDelegated", type: "uint32", internalType: "uint32" },
          { name: "votingPower", type: "uint16", internalType: "uint16" },
          { name: "delegateId", type: "uint16", internalType: "uint16" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "simulateCreate2",
    inputs: [
      { name: "_salt", type: "bytes32", internalType: "bytes32" },
      { name: "_creationCodeHash", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [
      { name: "simulatedDeployment", type: "address", internalType: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "upgradeTo",
    inputs: [
      { name: "newImplementation", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "upgradeToAndCall",
    inputs: [
      { name: "newImplementation", type: "address", internalType: "address" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "event",
    name: "AdminChanged",
    inputs: [
      {
        name: "previousAdmin",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "newAdmin",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BeaconUpgraded",
    inputs: [
      {
        name: "beacon",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DelegateCreated",
    inputs: [
      {
        name: "delegate",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      { name: "id", type: "uint256", indexed: false, internalType: "uint256" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DelegationDeleted",
    inputs: [
      {
        name: "disqualifiedDelegation",
        type: "tuple",
        indexed: false,
        internalType: "struct IWave.Delegation",
        components: [
          { name: "delegator", type: "address", internalType: "address" },
          { name: "blockDelegated", type: "uint32", internalType: "uint32" },
          { name: "votingPower", type: "uint16", internalType: "uint16" },
          { name: "delegateId", type: "uint16", internalType: "uint16" },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DelegationRegistered",
    inputs: [
      {
        name: "optimisticDelegation",
        type: "tuple",
        indexed: false,
        internalType: "struct IWave.Delegation",
        components: [
          { name: "delegator", type: "address", internalType: "address" },
          { name: "blockDelegated", type: "uint32", internalType: "uint32" },
          { name: "votingPower", type: "uint16", internalType: "uint16" },
          { name: "delegateId", type: "uint16", internalType: "uint16" },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      { name: "version", type: "uint8", indexed: false, internalType: "uint8" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Upgraded",
    inputs: [
      {
        name: "implementation",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "Create2Failure", inputs: [] },
  {
    type: "error",
    name: "DelegateSaturated",
    inputs: [{ name: "delegateId", type: "uint256", internalType: "uint256" }],
  },
  { type: "error", name: "InsufficientDelegations", inputs: [] },
  {
    type: "error",
    name: "InsufficientVotingPower",
    inputs: [{ name: "nounder", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "InvalidDelegateId",
    inputs: [{ name: "delegateId", type: "uint256", internalType: "uint256" }],
  },
  { type: "error", name: "InvalidSignature", inputs: [] },
  {
    type: "error",
    name: "NotDelegated",
    inputs: [
      { name: "nounder", type: "address", internalType: "address" },
      { name: "delegate", type: "address", internalType: "address" },
    ],
  },
  { type: "error", name: "OnlyDelegatecallContext", inputs: [] },
  { type: "error", name: "Unauthorized", inputs: [] },
] as const;
