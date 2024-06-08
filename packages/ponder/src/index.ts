import { ponder } from "@/generated";
import { configAddresses } from "../ponder.config";
import { NounsTokenABI } from "../abi/NounsToken";
import publicClient from "../lib/viem";
import { IdeaTokenHubABI } from "../abi/IdeaTokenHub";

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
      isArchived: false,
    },
  });
});

ponder.on("IdeaTokenHub:Sponsorship", async ({ event, context }) => {
  const { Supporter } = context.db;
  const concatAddrWithId = `${event.args.sponsor}-${event.args.ideaId}`;
  const createObj: any = {
    owner: event.args.sponsor,
    tokenId: event.args.ideaId,
    balance: event.args.params.contributedBalance,
    isCreator: event.args.params.isCreator,
  };
  // conditionally assign `.optional()` column if truthy
  if (event.args.reason !== "") createObj.reason = event.args.reason;

  await Supporter.upsert({
    id: concatAddrWithId,
    create: createObj,
    update: {
      balance: event.args.params.contributedBalance,
    },
  });
});

ponder.on("Wave:DelegateCreated", async ({ event, context }) => {
  const { DelegateProxy } = context.db;

  // TODO: this might be wrong -- we shouldn't add the voting power to the delegate until it is registered?
  // Can we assume that it has the "full power" of the votes delegated to it if they are not registered?
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

ponder.on("IdeaTokenHub:WaveFinalized", async ({ event, context }) => {
  const { Wave, IdeaToken } = context.db;

  const [currentWaveId, _] = await publicClient.readContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "getCurrentWaveInfo",
    // get the block before this to ensure we are getting the currentWave before we closed it
    blockNumber: BigInt(event.block.number) - BigInt(1),
  });

  // The point of this is the ensure we are back-filling waves
  // If they have not been created for whatever reason
  const mostRecentWave = await Wave.findMany({
    orderBy: { id: "desc" },
    limit: 1,
  });

  const mostRecentWaveId = mostRecentWave.items[0]
    ? mostRecentWave.items[0].id
    : 0;
  for (let i = mostRecentWaveId + 1; i <= currentWaveId; i++) {
    await Wave.create({
      id: i,
    });
  }

  const winningIdeas = event.args.proposedIdeas;

  for (const idea of winningIdeas) {
    await IdeaToken.update({
      id: idea.waveIdeaId,
      data: {
        waveId: Number(currentWaveId),
        nounsProposalId: idea.nounsProposalId,
        totalFunding: idea.totalFunding,
        isArchived: true,
      },
    });
  }
});
