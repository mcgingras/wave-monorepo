"use client";

import { useEnsName } from "wagmi";
import { truncateEthAddress } from "@/lib/utils";
import { IdeaToken } from "@/models/IdeaToken/types";
import Markdown from "react-markdown";
import { formatUnits } from "viem";
import { TransactionPill } from "../ActionList";
import { parse } from "@/lib/camp/transactions";

const ideaOneFixed = `
![header](https://i.imgur.com/pdOP2jW.png)
This proposal is asking to receive 2 Nouns from the treasury, in order to power the Wave protocol (formerly Prop Lot). The aim of the Wave protocol is to unlock the voting power of idle Nouns and to use it to do 3 things:
1. Open a scalable proposal pipeline for builders
2.  Provide an additional income source for Nouns DAO
3.  Empower Nouns fans to permissionlessly contribute

**What is Wave?**
The Wave protocol is an autonomous-proposal protocol, designed to introduce a new proposal pipeline for Nouns DAO, and further push Nouns in the direction of scalable, permissionless capital allocation. The current proposal pipeline is entirely governance driven. This requires the small governance layer to identify and support ideas all the way up to an onchain vote. The Wave protocol combines the power of delegation and attention to decide which ideas are presented to Nouns DAO voters for an onchain vote. It does this by taking delegation of inactive Nouns and using them to power a new form of participation for Nouns fans - Proposal Scouting.

**How does it work?**
At its heart, the Wave protocol functions as a “Nouns proposal creation as a service”. It does this in two parts: Idea minting and Noun delegation.
![hero](https://i.imgur.com/HGa0S9L.png)

**1 - Support ideas by minting them**
- Nouns Fans interested in supporting an idea do so by minting the idea
- Minting is done in ETH, and supporters receive a representative ERC1155 token for each idea they support
- The cost of minting is open for supporters to decide how much they'd like to pledge in support
- At the end of each cycle, the ideas with the most ETH pledged are submitted to Nouns for an onchain vote

**2 - Turn ideas into proposals with delegated Nouns**
- Wave protocol accepts Nouns token voting power noncustodially via delegation
- Delegated Nouns are used to submit winning ideas from each Wave to Nouns DAO as a proposal
- Delegators are compensated for delegating their voting power in the form of a yield, which comprises the total ETH pledged to the winning ideas

The result, on a technical level is the submission of proposals driven by crowdsourced support. On a higher level, we end up with the increased democratisation of access to Nouns, by lowering the barrier of entry for those with a worthy idea and a desire to contribute.

For a more technical breakdown of how the protocol works go here:
- [Technical Docs](https://nouns-wave-protocol.vercel.app/)
- [Technical Blog Post](]https://mirror.xyz/0x1B20487f021935bb96D5E9ac2259423D467E46cd/eOgidZwLVpXbmJgWmZVviku70_tbZBgvXb-kIfAiaSs)

**Who is served by Wave?**
1. **Nouns voters** - Voter attention is limited and should be used sparingly. Alleviating them of the decision of which ideas make it onchain means they can focus on the onchain vote itself.
2. **Builders** - A lot of builders aren't accustomed to navigating the social layer of DAOs. They can benefit from having a permissionless pipeline for their ideas, with the ability to go onchain through crowdsourced support, however they obtain it.
3. **Nouns fans** - Nouns DAO has a lot of fans that would like to participate in meaningful ways. Having the ability to scout proposals gives them a way of expressing their vision for Nouns in a provable and meaningful manner.

**How does Wave benefit Nouns DAO?**

**Scalable proposal funnel**
To bring an idea to the voting stage with Nouns, you must either own Nouns tokens, find a Noun owner to delegate their Noun to you, or submit a candidate proposal and hope it gets noticed. The latter two require understanding Nouns' social layer and know how to effectively navigate them. Not only is this difficult to scale, it also creates a lack of clarity around getting funding, making it hard for builders to come forward with their ideas and hard for Nouns fans to meaningfully contribute. A fully permisionless pipeline for proposals that leverages crowdsourced support will improve clarity, encourage more participation and fresh ideas.

**Additional income source for the DAO**
Reports indicate that at its current spending rate, Nouns has 8-14 months of runway before its treasury runs dry. To sustain itself, Nouns can greatly benefit from having more ways to fund the treasury beyond daily auctions. With 560 treasury Nouns sitting idle, allocating a few to the wave protocol could monetise their voting power and generate new funding sources for the treasury.

**Provable way of turning Nouns Fans intro contributors**
Many people are interested in Nouns but don't have many ways of meaningfully contributing. This is even harder for those without an existing track record, making it very challenging for them to secure a delegate or be taken seriously in the Nouns community. They can champion proposals and leave VWRs, but these efforts often go unnoticed and unrewarded, when done without voting power. The wave protocol introduces a scouting model similar to traditional VC scouts, where “Proposal scouts" mint and support promising ideas, collect NFTs and build a reputation over time. This new method gives Nouns fans a permissionless way of building social capital and recognition within the Nouns ecosystem.

**The ask**
This proposal is asking to receive 2 Nouns from the treasury. These 2 Nouns will be kept in a Multisig Safe from which they will be delegated to the Wave protocol. The Multisig Safe will require 2 / 3 signers.

**Safe address**
0x15d29bEB247C29B575e1B32D626111F13a3a4b23

**The Multisig signers:**
1. adelidusiam
2. Joelcares
3. Krel
`;

const FullIdeaCard = ({ ideaToken }: { ideaToken: IdeaToken }) => {
  const ensName = useEnsName({
    address: ideaToken.author as `0x${string}`,
    chainId: 1,
  });

  const totalYield = ideaToken.supports.items.reduce(
    (acc, supporter) => acc + BigInt(parseInt(supporter.balance.toString())),
    BigInt(0)
  );

  const actions = JSON.parse(ideaToken.actions);
  const parsedActions = parse(actions, { chainId: 1 });

  let resolvedDescription = ideaToken.description;
  console.log('ideaToken.id:', ideaToken.id, 'Type:', typeof ideaToken.id);
  console.log('Comparison with BigInt(1):', ideaToken.id === BigInt(1));
  if (ideaToken.id === BigInt(1)) {
    resolvedDescription = ideaOneFixed;
  }

  return (
    <div
      className={`bg-white rounded-2xl flex flex-col p-6  ${
        !ideaToken.isArchived &&
        "hover:shadow-[0_0_0_2px_rgba(229,229,229,1)] transition-all"
      }`}
    >
      <div className="flex flex-row items-center space-x-2">
        <span className="text-neutral-500 bg-neutral-100 rounded-lg text-sm px-4 py-1 flex items-center justify-center">
          {ideaToken.id.toString()}
        </span>
        <h2 className="text-2xl polymath-disp font-bold tracking-wide text-neutral-700">
          {ideaToken.title}
        </h2>
      </div>
      <div className="flex flex-row items-center space-x-4 mt-6">
        <span className="text-neutral-500">Created by</span>
        <span className="h-1 border-b border-dotted flex-1 border-neutral-300"></span>
        <p className="font-bold text-neutral-700">
          {ensName.data || truncateEthAddress(ideaToken.author)}
        </p>
      </div>
      <div className="flex flex-row items-center space-x-4 mt-6">
        <span className="text-neutral-500">Total yield</span>
        <span className="h-1 border-b border-dotted flex-1 border-neutral-300"></span>
        <p className="font-bold text-neutral-700">
          {formatUnits(totalYield, 18)} ETH
        </p>
      </div>
      <div className="flex flex-row items-center space-x-4 mt-4">
        <span className="text-neutral-500 self-start">Actions</span>
        <span className="h-1 border-b border-dotted flex-1 border-neutral-300"></span>
        <div className="flex flex-wrap gap-2">
          {parsedActions.map((action: any, idx: number) => {
            return (
              <TransactionPill key={`action-${idx}`} transaction={action} />
            );
          })}
        </div>
      </div>

      <span className="font-bold mt-6 text-neutral-700">Description</span>
      <div className="bg-neutral-100 p-2 rounded-md prose text-sm text-neutral-500 mt-2">
        <Markdown>{resolvedDescription}</Markdown>
      </div>
    </div>
  );
};

export default FullIdeaCard;
