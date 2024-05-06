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

ponder.on("Wave:DelegateCreated", async ({ event, context }) => {
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

ponder.on("IdeaTokenHub:ProposedIdeas", async ({ event, context }) => {
  const { Wave, IdeaToken } = context.db;

  const [currentWaveId, _] = await publicClient.readContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "currentWaveInfo",
    blockNumber: event.block.number,
  });

  const winningIdeas = event.args.proposedIdeas;

  // create the wave
  // todo -- make sure that once the round ends, current wave is actually the current one
  // and not the previous one?
  // the other problem is that we only create waves when we hear this event and we only
  // hear this event when there are proposals to push on-chain. If a wave is finalized
  // with no winning proposals (no delegates or no ideas) then there will be no event
  // marking the wave. We could "back fill" -- get the most recent wave, get the current wave
  // for all intermediate waves, create them with no ideas. "endsAt" wont be accurate though.
  await Wave.create({
    id: currentWaveId,
  });

  for (const idea of winningIdeas) {
    await IdeaToken.update({
      id: idea.waveIdeaId,
      data: {
        waveId: currentWaveId,
        nounsProposalId: idea.nounsProposalId,
        totalFunding: idea.totalFunding,
      },
    });
  }
});
