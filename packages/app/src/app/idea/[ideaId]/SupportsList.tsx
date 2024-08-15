import { IdeaToken } from "@/models/IdeaToken/types";
import { Support } from "@/models/Supporter/types";
import { formatUnits } from "viem";
import AvatarAddress from "@/components/ui/AvatarAddress";

const getSupporters = async (ideaId: bigint) => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
  query GetSupporters($ideaId: BigInt!) {
    ideaTokens(where: {id: $ideaId}) {
      items {
        supports {
          items {
            balance
            supporterId
            reason
            tokenId
          }
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
      variables: { ideaId: ideaId },
    }),
  };

  try {
    const data = await fetch(url, graphqlRequest);
    const json = await data.json();
    return json.data.ideaTokens.items;
  } catch (e) {
    console.log("error", e);
    return [];
  }
};

const SupportsList = async ({ ideaId }: { ideaId: bigint }) => {
  const ideaTokens = (await getSupporters(ideaId)) as IdeaToken[];
  const supports = ideaTokens.reduce((acc, ideaToken) => {
    return acc.concat(ideaToken.supports.items);
  }, [] as Support[]);

  return (
    <div className="mt-8 p-4 rounded-lg">
      <div className="border-b pb-2 border-neutral-200">
        <h3 className="text-neutral-500 text-sm font-normal">
          {supports.length} Supporter{supports.length !== 1 ? "s" : ""}
        </h3>
      </div>
      <div className="mt-4 space-y-4">
        {supports.length > 0 ? (
          supports.map((supporter, idx) => {
            return (
              <div key={`supporters-${idx}`}>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center space-x-2">
                    <AvatarAddress
                      address={supporter.supporterId as `0x${string}`}
                      size="sm"
                    />
                    <span className="text-neutral-500 bg-neutral-200 rounded-full px-3 py-0.5 text-xs">
                      Idea {supporter.tokenId.toString()}
                    </span>
                  </div>
                  <span className="text-neutral-500">
                    {formatUnits(BigInt(supporter.balance.toString()), 18)} ETH
                  </span>
                </div>
                <p className="text-neutral-500 mt-1 text-sm">
                  {supporter.reason}
                </p>
              </div>
            );
          })
        ) : (
          <div className="mt-4 text-neutral-500 text-sm font-normal">
            <p className="text-neutral-500 text-center">No supporters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportsList;
