import { IdeaToken } from "@/models/IdeaToken/types";
import NewIdeaCard from "@/components/IdeaCard/New";
import Link from "next/link";
import Image from "next/image";

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
    <div className="space-y-4 mt-4 first:mt-0">
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
        <div className="mt-6">
          <Image
            src="/ghost_badge.svg"
            width={100}
            height={100}
            alt="gray rounded looking shape"
            className="mx-auto"
          />
          <p className="text-neutral-500 text-lg font-bold text-center mt-2">
            No ideas submitted
          </p>
        </div>
      )}
    </div>
  );
};

export default IdeaListUI;
