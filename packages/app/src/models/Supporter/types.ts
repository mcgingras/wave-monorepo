import { IdeaToken } from "../IdeaToken/types";

export type Supporter = {
  id: string;
  supportedIdeas: {
    items: Support[];
  };
};

export type Support = {
  id: string;
  tokenId: bigint;
  token: IdeaToken;
  balance: string;
  isCreator: boolean;
  reason: string;
  supporterId: string;
};
