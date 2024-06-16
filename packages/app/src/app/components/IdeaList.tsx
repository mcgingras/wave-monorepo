import { IdeaToken } from "@/models/IdeaToken/types";
import NewIdeaCard from "@/components/IdeaCard/New";
import Link from "next/link";

const getIdeas = async () => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
    query GetIdeaTokens {
      ideaTokens(where: { isArchived: false }) {
          items {
              id
              author
              title
              description
              createdAt
              supporters {
                  items {
                  balance
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

const IdeaList = async () => {
  const ideaTokens = (await getIdeas()) as IdeaToken[];
  const ideaTokensWithPooledEth = ideaTokens.map((ideaToken) => {
    const pooledEth = ideaToken.supporters.items.reduce(
      (acc, supporter) => acc + parseInt(supporter.balance.toString()),
      0
    );
    return {
      ...ideaToken,
      pooledEth,
    };
  });

  const sortedIdeaTokens = ideaTokensWithPooledEth.sort(
    (a, b) => b.pooledEth - a.pooledEth
  );

  return (
    <div className="space-y-8 mt-4">
      {sortedIdeaTokens.length > 0 ? (
        sortedIdeaTokens.map((ideaToken, idx) => {
          return (
            <div key={`idea-${idx}`}>
              <Link href={`/idea/${ideaToken.id}`}>
                <NewIdeaCard ideaToken={ideaToken} />
              </Link>
            </div>
          );
        })
      ) : (
        <div className="border p-4 bg-white rounded-lg mt-4">
          <p className="text-neutral-500 text-center">
            No ideas submitted yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default IdeaList;
