import Drawer from "@/app/components/Drawer";
import { IdeaToken } from "@/models/IdeaToken/types";
import { parse, buildActions } from "@/lib/camp/transactions";
import ActionListItems from "./ActionListItems";
import SupportListUI from "@/app/components/SupportListUI";
import { formatUnits } from "viem";
import EnsImage from "@/app/scout/[address]/EnsImage";
import EnsName from "@/app/scout/[address]/EnsName";
import IdeaNFT from "@/components/IdeaNFT";
import { client } from "@/lib/viem";
import { configAddresses, WAVELENGTH } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "only-no-store";

const getIdea = async (id: bigint) => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
      query GetIdeaToken($ideaTokenId: BigInt!) {
          ideaToken(id: $ideaTokenId) {
              id
              createdAt
              author
              title
              description
              createdAt
              actions
              isArchived
              supports {
                  items {
                  tokenId
                  reason
                  balance
                  supporterId
                  }
              }
          }
        }
     `;

  const graphqlRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { ideaTokenId: id },
    }),
  };

  try {
    const data = await fetch(url, graphqlRequest);
    const json = await data.json();
    return json.data.ideaToken;
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

const getWaveStatus = async () => {
  const waveInfo = await client.readContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "getCurrentWaveInfo",
  });

  const startBlock = waveInfo[1].startBlock;
  const blockNumber = await client.getBlockNumber();
  const blocksElapsed = parseInt(blockNumber?.toString()) - startBlock;
  const remainingBlocks = WAVELENGTH - blocksElapsed;

  return {
    active: remainingBlocks > 0 ? true : false,
  };
};

const Page = async ({ params }: { params: { ideaId: bigint } }) => {
  const { ideaId } = params;
  const ideaToken = (await getIdea(ideaId)) as IdeaToken;
  const waveStatus = await getWaveStatus();
  const supports = ideaToken.supports.items;
  const actions = JSON.parse(ideaToken.actions);
  const parsedActions = parse(actions, { chainId: 1 });
  // @ts-ignore
  const builtActions = buildActions(parsedActions, { chainId: 1 });
  const createdAt = new Date(parseInt(ideaToken.createdAt) * 1000);

  const daysAgo = Math.floor(
    (new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  const pooledEth = ideaToken.supports.items.reduce(
    (acc, support) => acc + parseInt(support.balance.toString()),
    0
  );

  return (
    <Drawer ideaToken={ideaToken}>
      <section className="px-4">
        <div className="flex flex-row items-center space-x-2">
          <span className="text-neutral-500 bg-neutral-100 rounded-lg text-sm px-4 py-1 flex items-center justify-center mt-1">
            {params.ideaId.toString()}
          </span>
          <h1 className="text-2xl font-semibold tracking-wide text-gray-900">
            {ideaToken.title}
          </h1>
        </div>
        <div className="flex flex-row space-x-4 mt-4">
          <div className="flex flex-row w-1/2 flex-1 space-x-4 items-center">
            <EnsImage address={ideaToken.author} />
            <div className="flex flex-col">
              <span>
                {daysAgo} day{daysAgo !== 1 && "s"} ago
              </span>

              <EnsName address={ideaToken.author} />
            </div>
          </div>
          <div className="flex flex-row w-1/2 flex-1 space-x-4 items-center">
            <IdeaNFT id={ideaToken.id} className="h-12 w-12" />
            <div className="flex flex-col">
              <span>{formatUnits(BigInt(pooledEth), 18)} ETH</span>
              <span>
                {supports.length} supporter{supports.length !== 1 && "s"}
              </span>
            </div>
          </div>
        </div>
        <div className="border-b mt-8">
          <h3 className="text-sm text-neutral-500">
            {actions.targets.length} action{actions.targets.length !== 1 && "s"}
          </h3>
        </div>
        <div className="py-2">
          <ActionListItems builtActions={builtActions} />
        </div>
        <div className="border-b mt-4">
          <h3 className="text-sm text-neutral-500">Description</h3>
        </div>
        <p className="mt-2 text-sm text-neutral-700">{ideaToken.description}</p>

        <SupportListUI
          supports={supports}
          options={{
            withIdeaId: false,
          }}
        />
      </section>
    </Drawer>
  );
};

export default Page;
