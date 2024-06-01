import IdeaCardSkeleton from "@/components/IdeaCard/Skeleton";
import ExpandableIdeaCard from "@/components/IdeaCard/Expandable";

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
            supporters {
                items {
                balance
                owner
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

const IdeaPage = async ({ params }: { params: { ideaId: bigint } }) => {
  const { ideaId } = params;
  const ideaToken = await getIdea(ideaId);

  return (
    <div className="min-h-[calc(100vh-165px)] mt-[65px] bg-neutral-100 py-12 flex flex-col">
      <section className="w-[600px] mx-auto space-y-4">
        {ideaToken ? (
          <ExpandableIdeaCard
            ideaToken={ideaToken}
            expandable={true}
            clickable={false}
            archived={false}
          />
        ) : (
          <IdeaCardSkeleton />
        )}
      </section>
    </div>
  );
};

export default IdeaPage;
