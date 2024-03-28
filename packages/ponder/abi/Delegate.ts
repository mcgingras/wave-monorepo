export const DelegateABI = [
  {
    type: "constructor",
    inputs: [{ name: "propLot_", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "propLot",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pushProposal",
    inputs: [
      {
        name: "governor",
        type: "address",
        internalType: "contract INounsDAOLogicV3",
      },
      {
        name: "txs",
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
    outputs: [
      { name: "nounsProposalId", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "NotPropLotCore",
    inputs: [{ name: "caller", type: "address", internalType: "address" }],
  },
] as const;
