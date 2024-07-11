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
    supporters: p.many("Support.tokenId"),
    waveId: p.int().references("Wave.id").optional(),
    nounsProposalId: p.bigint().optional(),
    totalFunding: p.bigint().optional(),
    isArchived: p.boolean(),
  }),
  // --------------------------------
  // Support -- represents the abstract concept of an instance of supporting an idea
  // --------------------------------
  Support: p.createTable({
    id: p.string(), // string.concat(<address>, "-", <tokenId>)
    tokenId: p.bigint().references("IdeaToken.id"),
    balance: p.bigint(),
    isCreator: p.boolean(),
    reason: p.string().optional(),
    supporterId: p.string().references("Supporter.id"),
  }),
  // --------------------------------
  // Supporter -- the actual supporter of ideas
  // --------------------------------
  Supporter: p.createTable({
    id: p.string(), // address
    supportedIdeas: p.many("Support.supporterId"),
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
