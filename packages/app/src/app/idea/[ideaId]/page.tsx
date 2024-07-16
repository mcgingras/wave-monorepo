import IdeaCardSkeleton from "@/components/IdeaCard/Skeleton";
import BackButton from "@/app/components/BackButton";
import FullIdeaCard from "@/components/IdeaCard/Full";
import SupportButton from "@/components/IdeaCard/SupportButton";
import SupportsList from "./SupportsList";
import { Suspense } from "react";

// clears out next-js cache for viem calls
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "only-no-store";

const getIdea = async (id: bigint) => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
    query GetIdeaToken($ideaTokenId: BigInt!) {
        ideaToken(id: $ideaTokenId) {
            id
            author
            title
            description
            createdAt
            actions
            isArchived
            supports {
                items {
                reason
                balance
                id
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
    console.log(json);
    return json.data.ideaToken;
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

const IdeaPage = async ({ params }: { params: { ideaId: bigint } }) => {
  const { ideaId } = params;
  const ideaToken = await getIdea(ideaId);

  return (
    <div className="min-h-[calc(100vh-72px)] mt-[72px] pt-12 bg-neutral-100 flex flex-col">
      <div className="container mx-auto pb-12">
        <BackButton />
        <section className="grid grid-cols-8 gap-8 mt-4">
          <section className="col-span-5">
            {ideaToken ? (
              <FullIdeaCard ideaToken={ideaToken} />
            ) : (
              <IdeaCardSkeleton />
            )}
          </section>
          <section className="col-span-3">
            <div className="p-4 bg-white rounded-xl">
              <SupportButton ideaId={ideaId} />
            </div>
            <Suspense fallback={<IdeaCardSkeleton />}>
              <SupportsList ideaId={ideaId} />
            </Suspense>
          </section>
        </section>
      </div>
    </div>
  );
};

export default IdeaPage;
