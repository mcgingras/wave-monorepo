import Drawer from "@/app/components/Drawer";
import { IdeaToken } from "@/models/IdeaToken/types";
import { parse, buildActions } from "@/lib/camp/transactions";
import ActionListItems from "./ActionListItems";
import { Suspense } from "react";
import SupportListUI from "@/app/components/SupportListUI";

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

const Page = async ({ params }: { params: { ideaId: bigint } }) => {
  const { ideaId } = params;
  const ideaToken = (await getIdea(ideaId)) as IdeaToken;
  const supports = ideaToken.supports.items;
  const actions = JSON.parse(ideaToken.actions);
  const parsedActions = parse(actions, { chainId: 1 });
  // @ts-ignore
  const builtActions = buildActions(parsedActions, { chainId: 1 });

  return (
    <Drawer ideaToken={ideaToken}>
      <section className="px-4">
        <h1 className="text-2xl font-semibold tracking-wide text-gray-900">
          {ideaToken.title}
        </h1>
        <div className="border-b mt-4">
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
