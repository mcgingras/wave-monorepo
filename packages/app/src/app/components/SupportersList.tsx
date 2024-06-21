import { IdeaToken } from "@/models/IdeaToken/types";
import { Supporter } from "@/models/Supporter/types";
import { truncateEthAddress } from "@/lib/utils";
import { formatUnits } from "viem";
import AvatarAddress from "@/components/ui/AvatarAddress";

const getSupporters = async () => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
  query GetSupporters {
    ideaTokens(where: {isArchived: false}) {
      items {
        supporters {
          items {
            balance
            owner
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
      variables: {},
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

const SupportersList = async () => {
  const ideaTokens = (await getSupporters()) as IdeaToken[];
  const supporters = ideaTokens.reduce((acc, ideaToken) => {
    return acc.concat(ideaToken.supporters.items);
  }, [] as Supporter[]);

  return (
    <div className="mt-8 bg-white p-4 rounded-lg">
      <h3 className="polymath-disp font-bold tracking-wide">Supporters</h3>
      <div className="mt-4 space-y-6">
        {supporters.length > 0 ? (
          supporters.map((supporter, idx) => {
            return (
              <div key={`supporters-${idx}`}>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center space-x-2">
                    <AvatarAddress address={supporter.owner as `0x${string}`} />
                    <span className="text-indigo-500 bg-indigo-100 rounded-full px-2 py-0.5 text-sm">
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
          <div className="border p-4 bg-white rounded-lg mt-4">
            <p className="text-neutral-500 text-center">No supporters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportersList;
