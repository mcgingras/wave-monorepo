import Drawer from "@/app/components/Drawer";
import { IdeaToken } from "@/models/IdeaToken/types";

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
                  reason
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

const Page = async ({ params }: { params: { ideaId: bigint } }) => {
  const { ideaId } = params;
  const ideaToken = (await getIdea(ideaId)) as IdeaToken;

  return (
    <Drawer ideaToken={ideaToken}>
      <section className="px-4">
        <h1 className="text-2xl font-semibold tracking-wide text-gray-900">
          {ideaToken.title}
        </h1>
        <div className="border-b mt-4">
          <h3 className="text-sm text-neutral-500 font-bold">2 actions</h3>
        </div>
        <div className="border-b mt-4">
          <h3 className="text-sm text-neutral-500 font-bold">Description</h3>
        </div>
        <p className="mt-2 text-sm text-gray-500">{ideaToken.description}</p>
        <div className="border-b mt-4">
          <h3 className="text-sm text-neutral-500 font-bold">12 supporters</h3>
        </div>
      </section>
    </Drawer>
  );
};

export default Page;
