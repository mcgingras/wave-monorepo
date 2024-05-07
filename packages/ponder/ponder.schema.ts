import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  // --------------------------------
  // IdeaTokenHub -- the ERC1155 base token
  // --------------------------------
  IdeaToken: p.createTable({
    id: p.bigint(),
    author: p.string(),
    title: p.string(),
    description: p.string(),
    actions: p.string(), // JSON.stringified array of actions
    createdAt: p.bigint(),
    supporters: p.many("Supporter.tokenId"),
    waveId: p.int().references("Wave.id").optional(),
    nounsProposalId: p.bigint().optional(),
    totalFunding: p.bigint().optional(),
    isArchived: p.boolean(),
  }),
  Supporter: p.createTable({
    id: p.string(), // string.concat(<address>, "-", <tokenId>)
    owner: p.string(),
    tokenId: p.bigint().references("IdeaToken.id"),
    balance: p.bigint(),
    isCreator: p.boolean(),
  }),
  DelegateProxy: p.createTable({
    id: p.string(), // delegate address string
    createdAt: p.bigint(),
    delegators: p.many("Delegator.delegateProxyId"),
    votingPower: p.bigint(),
  }),
  Delegator: p.createTable({
    id: p.string(), // delegator (nouns token holder) address string
    delegateProxyId: p.string().references("DelegateProxy.id"),
  }),
  // --------------------------------
  // Wave -- marks each wave and the winners
  // --------------------------------
  Wave: p.createTable({
    id: p.int(),
    winningIdeas: p.many("IdeaToken.waveId"),
  }),
}));
