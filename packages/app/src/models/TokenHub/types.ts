export type Idea = {
  id: number;
  blockCreated: number;
  isProposed: boolean;
  proposalTxs: {
    targets: readonly `0x${string}`[];
    values: readonly bigint[];
    signatures: readonly string[];
    calldatas: readonly `0x${string}`[];
  };
  totalFunding: BigInt;
};
