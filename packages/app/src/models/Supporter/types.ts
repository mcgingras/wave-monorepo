export type Supporter = {
  id: BigInt;
  owner: string;
  tokenId: BigInt;
  balance: BigInt;
  isCreator: boolean;
  reason?: string;
};
