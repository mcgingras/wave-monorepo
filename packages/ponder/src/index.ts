import { Context, ponder } from "@/generated";
import { configAddresses } from "../ponder.config";
import { Address, isAddressEqual } from "viem";

ponder.on("IdeaTokenHub:IdeaCreated", async ({ event, context }) => {
  const { IdeaToken } = context.db;
  const [title, description] = event.args.idea.description.split(`\n\n`);
  console.log(event.args);
  await IdeaToken.create({
    id: event.args.ideaId,
    data: {
      author: event.args.creator,
      title: title || "",
      description: description || "",
      createdAt: event.block.timestamp,
    },
  });
});

ponder.on("IdeaTokenHub:Sponsorship", async ({ event, context }) => {
  const { Supporter } = context.db;
  const concatAddrWithId = `${event.args.sponsor}-${event.args.ideaId}`;
  await Supporter.upsert({
    id: concatAddrWithId,
    create: {
      owner: event.args.sponsor,
      tokenId: event.args.ideaId,
      balance: event.args.params.contributedBalance,
      isCreator: event.args.params.isCreator,
    },
    update: {
      balance: event.args.params.contributedBalance,
    },
  });
});
