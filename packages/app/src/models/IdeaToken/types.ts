export type IdeaToken = {
  id: BigInt;
  author: string;
  title: string;
  description: string;
  createdAt: BigInt;
  supporters: Supporter[];
};

export type Supporter = {
  id: BigInt;
  owner: string;
  tokenId: BigInt;
  balance: BigInt;
  isCreator: boolean;
};
