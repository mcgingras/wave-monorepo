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
  }),
  Supporter: p.createTable({
    id: p.string(), // string.concat(<address>, "-", <tokenId>)
    owner: p.string(),
    tokenId: p.bigint().references("IdeaToken.id"),
    balance: p.bigint(),
    isCreator: p.boolean(),
  }),
}));
