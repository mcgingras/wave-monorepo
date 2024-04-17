import { Supporter } from "../Supporter/types";

type ActionObject = {
  targets: `0x${string}`[];
  values: `0x${string}`[];
  signatures: string[];
  calldatas: `0x${string}`[];
};

export type IdeaToken = {
  id: BigInt;
  author: string;
  title: string;
  description: string;
  createdAt: BigInt;
  supporters: Supporter[];
  actions: ActionObject;
};
