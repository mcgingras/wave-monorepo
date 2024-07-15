type Delegate = {
  id: string;
};

export type DelegateProxy = {
  id: string;
  createdAt: BigInt;
  nouns: {
    items: { id: string }[];
  };
  delegators: { items: Delegate[] };
  votingPower: BigInt;
};
