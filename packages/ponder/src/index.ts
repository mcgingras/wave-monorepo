import { ponder } from "@/generated";
import { configAddresses } from "../ponder.config";
import { NounsTokenABI } from "../abi/NounsToken";

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

ponder.on("PropLotHarness:DelegateCreated", async ({ event, context }) => {
  const { DelegateProxy } = context.db;
  const initVotingPower = await context.client.readContract({
    address: configAddresses.NounsTokenHarness as `0x${string}`,
    abi: NounsTokenABI,
    functionName: "getCurrentVotes",
    args: [event.args.delegate],
  });
  await DelegateProxy.create({
    id: event.args.delegate,
    data: {
      createdAt: event.block.timestamp,
      votingPower: initVotingPower,
    },
  });
});

ponder.on("NounsToken:DelegateChanged", async ({ event, context }) => {
  const { DelegateProxy, Delegator } = context.db;
  const existingDelegateProxy = await DelegateProxy.findUnique({
    id: event.args.toDelegate,
  });
  if (existingDelegateProxy) {
    await Delegator.upsert({
      id: event.args.delegator,
      create: {
        delegateProxyId: event.args.toDelegate,
      },
      update: {
        delegateProxyId: event.args.toDelegate,
      },
    });
  } else {
    await Delegator.delete({
      id: event.args.fromDelegate,
    });
  }
});

ponder.on("NounsToken:DelegateVotesChanged", async ({ event, context }) => {
  const { DelegateProxy } = context.db;
  const existingDelegateProxy = await DelegateProxy.findUnique({
    id: event.args.delegate,
  });
  if (existingDelegateProxy) {
    await DelegateProxy.update({
      id: event.args.delegate,
      data: {
        votingPower: event.args.newBalance,
      },
    });
  }
});
