export const IdeaTokenHubABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "nounsGovernor_",
        type: "address",
        internalType: "contract INounsDAOLogicV3",
      },
      { name: "uri_", type: "string", internalType: "string" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      { name: "account", type: "address", internalType: "address" },
      { name: "id", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "balanceOfBatch",
    inputs: [
      { name: "accounts", type: "address[]", internalType: "address[]" },
      { name: "ids", type: "uint256[]", internalType: "uint256[]" },
    ],
    outputs: [{ name: "", type: "uint256[]", internalType: "uint256[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "claim",
    inputs: [],
    outputs: [{ name: "claimAmt", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createIdea",
    inputs: [
      {
        name: "ideaTxs",
        type: "tuple",
        internalType: "struct NounsDAOV3Proposals.ProposalTxs",
        components: [
          { name: "targets", type: "address[]", internalType: "address[]" },
          { name: "values", type: "uint256[]", internalType: "uint256[]" },
          { name: "signatures", type: "string[]", internalType: "string[]" },
          { name: "calldatas", type: "bytes[]", internalType: "bytes[]" },
        ],
      },
      { name: "description", type: "string", internalType: "string" },
    ],
    outputs: [{ name: "newIdeaId", type: "uint96", internalType: "uint96" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "currentWaveInfo",
    inputs: [],
    outputs: [
      { name: "currentWave", type: "uint32", internalType: "uint32" },
      { name: "startBlock", type: "uint32", internalType: "uint32" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "finalizeWave",
    inputs: [],
    outputs: [
      {
        name: "delegations",
        type: "tuple[]",
        internalType: "struct IPropLot.Delegation[]",
        components: [
          { name: "delegator", type: "address", internalType: "address" },
          { name: "blockDelegated", type: "uint32", internalType: "uint32" },
          { name: "votingPower", type: "uint16", internalType: "uint16" },
          { name: "delegateId", type: "uint16", internalType: "uint16" },
        ],
      },
      { name: "winningIds", type: "uint96[]", internalType: "uint96[]" },
      {
        name: "nounsProposalIds",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getClaimableYield",
    inputs: [{ name: "nounder", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getIdeaInfo",
    inputs: [{ name: "ideaId", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IIdeaTokenHub.IdeaInfo",
        components: [
          { name: "totalFunding", type: "uint216", internalType: "uint216" },
          { name: "blockCreated", type: "uint32", internalType: "uint32" },
          { name: "isProposed", type: "bool", internalType: "bool" },
          {
            name: "proposal",
            type: "tuple",
            internalType: "struct IPropLot.Proposal",
            components: [
              {
                name: "ideaTxs",
                type: "tuple",
                internalType: "struct NounsDAOV3Proposals.ProposalTxs",
                components: [
                  {
                    name: "targets",
                    type: "address[]",
                    internalType: "address[]",
                  },
                  {
                    name: "values",
                    type: "uint256[]",
                    internalType: "uint256[]",
                  },
                  {
                    name: "signatures",
                    type: "string[]",
                    internalType: "string[]",
                  },
                  {
                    name: "calldatas",
                    type: "bytes[]",
                    internalType: "bytes[]",
                  },
                ],
              },
              { name: "description", type: "string", internalType: "string" },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getNextIdeaId",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getOrderedEligibleIdeaIds",
    inputs: [{ name: "optLimiter", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "orderedEligibleIds",
        type: "uint96[]",
        internalType: "uint96[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getOrderedProposedIdeaIds",
    inputs: [],
    outputs: [
      {
        name: "orderedProposedIds",
        type: "uint96[]",
        internalType: "uint96[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSponsorshipInfo",
    inputs: [
      { name: "sponsor", type: "address", internalType: "address" },
      { name: "ideaId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IIdeaTokenHub.SponsorshipParams",
        components: [
          {
            name: "contributedBalance",
            type: "uint216",
            internalType: "uint216",
          },
          { name: "isCreator", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isApprovedForAll",
    inputs: [
      { name: "account", type: "address", internalType: "address" },
      { name: "operator", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "minSponsorshipAmount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "safeBatchTransferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "ids", type: "uint256[]", internalType: "uint256[]" },
      { name: "amounts", type: "uint256[]", internalType: "uint256[]" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "id", type: "uint256", internalType: "uint256" },
      { name: "amount", type: "uint256", internalType: "uint256" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setApprovalForAll",
    inputs: [
      { name: "operator", type: "address", internalType: "address" },
      { name: "approved", type: "bool", internalType: "bool" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "sponsorIdea",
    inputs: [{ name: "ideaId", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [{ name: "interfaceId", type: "bytes4", internalType: "bytes4" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "uri",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "waveLength",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "ApprovalForAll",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      { name: "approved", type: "bool", indexed: false, internalType: "bool" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "IdeaCreated",
    inputs: [
      {
        name: "idea",
        type: "tuple",
        indexed: false,
        internalType: "struct IPropLot.Proposal",
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
      {
        name: "creator",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "ideaId",
        type: "uint96",
        indexed: false,
        internalType: "uint96",
      },
      {
        name: "params",
        type: "tuple",
        indexed: false,
        internalType: "struct IIdeaTokenHub.SponsorshipParams",
        components: [
          {
            name: "contributedBalance",
            type: "uint216",
            internalType: "uint216",
          },
          { name: "isCreator", type: "bool", internalType: "bool" },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "IdeaProposed",
    inputs: [
      {
        name: "ideaInfo",
        type: "tuple",
        indexed: false,
        internalType: "struct IIdeaTokenHub.IdeaInfo",
        components: [
          { name: "totalFunding", type: "uint216", internalType: "uint216" },
          { name: "blockCreated", type: "uint32", internalType: "uint32" },
          { name: "isProposed", type: "bool", internalType: "bool" },
          {
            name: "proposal",
            type: "tuple",
            internalType: "struct IPropLot.Proposal",
            components: [
              {
                name: "ideaTxs",
                type: "tuple",
                internalType: "struct NounsDAOV3Proposals.ProposalTxs",
                components: [
                  {
                    name: "targets",
                    type: "address[]",
                    internalType: "address[]",
                  },
                  {
                    name: "values",
                    type: "uint256[]",
                    internalType: "uint256[]",
                  },
                  {
                    name: "signatures",
                    type: "string[]",
                    internalType: "string[]",
                  },
                  {
                    name: "calldatas",
                    type: "bytes[]",
                    internalType: "bytes[]",
                  },
                ],
              },
              { name: "description", type: "string", internalType: "string" },
            ],
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Sponsorship",
    inputs: [
      {
        name: "sponsor",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "ideaId",
        type: "uint96",
        indexed: false,
        internalType: "uint96",
      },
      {
        name: "params",
        type: "tuple",
        indexed: false,
        internalType: "struct IIdeaTokenHub.SponsorshipParams",
        components: [
          {
            name: "contributedBalance",
            type: "uint216",
            internalType: "uint216",
          },
          { name: "isCreator", type: "bool", internalType: "bool" },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TransferBatch",
    inputs: [
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      { name: "from", type: "address", indexed: true, internalType: "address" },
      { name: "to", type: "address", indexed: true, internalType: "address" },
      {
        name: "ids",
        type: "uint256[]",
        indexed: false,
        internalType: "uint256[]",
      },
      {
        name: "values",
        type: "uint256[]",
        indexed: false,
        internalType: "uint256[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TransferSingle",
    inputs: [
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      { name: "from", type: "address", indexed: true, internalType: "address" },
      { name: "to", type: "address", indexed: true, internalType: "address" },
      { name: "id", type: "uint256", indexed: false, internalType: "uint256" },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "URI",
    inputs: [
      { name: "value", type: "string", indexed: false, internalType: "string" },
      { name: "id", type: "uint256", indexed: true, internalType: "uint256" },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AlreadyProposed",
    inputs: [{ name: "ideaId", type: "uint256", internalType: "uint256" }],
  },
  {
    type: "error",
    name: "BelowMinimumSponsorshipAmount",
    inputs: [{ name: "value", type: "uint256", internalType: "uint256" }],
  },
  { type: "error", name: "ClaimFailure", inputs: [] },
  {
    type: "error",
    name: "InvalidActionsCount",
    inputs: [{ name: "count", type: "uint256", internalType: "uint256" }],
  },
  { type: "error", name: "InvalidDescription", inputs: [] },
  {
    type: "error",
    name: "NonexistentIdeaId",
    inputs: [{ name: "ideaId", type: "uint256", internalType: "uint256" }],
  },
  { type: "error", name: "ProposalInfoArityMismatch", inputs: [] },
  { type: "error", name: "Soulbound", inputs: [] },
  { type: "error", name: "WaveIncomplete", inputs: [] },
] as const;
