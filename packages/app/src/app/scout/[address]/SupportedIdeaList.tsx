import Image from "next/image";

const getSupportedIdeas = async (supporter: string) => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
    query GetSupportedIdeas($address: String!) {
      supporters(where: {owner: $address}) {
        items {
            tokenId
            reason
            balance
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
      variables: { address: supporter },
    }),
  };

  try {
    const data = await fetch(url, graphqlRequest);
    const json = await data.json();
    return json.data.supporters.items;
  } catch (e) {
    console.log("error", e);
    return [];
  }
};

const SupportedIdeaList = async ({
  supporterAddress,
}: {
  supporterAddress: `0x${string}`;
}) => {
  const supportedIdeas = (await getSupportedIdeas(supporterAddress)) as any[];

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {supportedIdeas.length > 0 ? (
        supportedIdeas.map((idea, idx) => {
          return (
            <div
              key={`supported-idea-${idx}`}
              className="bg-white p-4 rounded-lg flex flex-row space-x-4"
            >
              <div className="flex justify-center items-center p-2 bg-neutral-100 rounded-sm relative w-1/3">
                <Image src="/badge.svg" alt="temporary nft image" fill={true} />
                {/* <p className="text-sm text-neutral-500">
                  Balance: {idea.balance}
                </p> */}
              </div>
              <div className="flex flex-col w-2/3">
                <span className="text-neutral-400">{idea.tokenId}</span>
                <h3 className="font-bold flex-1 mt-1">Title will go here</h3>
                <p className="text-sm text-neutral-500 line-clamp-3 mt-1">
                  {idea.reason} {idea.reason} {idea.reason} {idea.reason}{" "}
                  {idea.reason} {idea.reason}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center">No supported ideas</div>
      )}
    </div>
  );
};

export default SupportedIdeaList;
