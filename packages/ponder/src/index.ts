import { ponder } from "@/generated";

ponder.on("IdeaTokenHub:IdeaCreated", async ({ event, context }) => {
  const { IdeaToken } = context.db;
  const [title, description] = event.args.idea.description.split(`\n\n`);

  const actions = JSON.stringify(event.args.idea.ideaTxs, (_, v) =>
    typeof v === "bigint" ? parseInt(v.toString()) : v
  );

  await IdeaToken.create({
    id: event.args.ideaId,
    data: {
      author: event.args.creator,
      title: title || "",
      actions,
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
