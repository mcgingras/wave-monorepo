import { IdeaToken } from "@/models/IdeaToken/types";
import NewIdeaCard from "@/components/IdeaCard/New";
import Link from "next/link";

const IdeaListUI = ({ ideaTokens }: { ideaTokens: IdeaToken[] }) => {
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
    <div className="space-y-8 mt-4 first:mt-0">
      {sortedIdeaTokens.length > 0 ? (
        sortedIdeaTokens.map((ideaToken, idx) => {
          return (
            <div key={`idea-${idx}`}>
              <Link href={`/idea/${ideaToken.id}`} scroll={false}>
                <NewIdeaCard ideaToken={ideaToken} />
              </Link>
            </div>
          );
        })
      ) : (
        <div className="p-4 bg-white rounded-lg mt-4">
          <p className="text-neutral-500 text-center">
            No ideas submitted yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default IdeaListUI;
