type Delegate = {
  id: string;
};

export type DelegateProxy = {
  id: string;
  createdAt: BigInt;
  delegators: Delegate[];
  votingPower: BigInt;
};
