import { Support } from "../Supporter/types";

export type Action = {
  target: `0x${string}`;
  value: string;
  signature: string;
  calldata: `0x${string}`;
};

export type ActionObject = {
  targets: `0x${string}`[];
  values: string[];
  signatures: string[];
  calldatas: `0x${string}`[];
};

export type IdeaToken = {
  id: BigInt;
  author: string;
  title: string;
  description: string;
  createdAt: BigInt;
  isArchived: boolean;
  totalFunding?: BigInt;
  supports: { items: Support[] };
  actions: string; // JSON.stringified array of ActionObject
  nounsProposalId?: BigInt;
  nounsProposalStatus?: string;
};
