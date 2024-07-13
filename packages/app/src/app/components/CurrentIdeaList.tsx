import { IdeaToken } from "@/models/IdeaToken/types";
import IdeaListUI from "./IdeaListUI";

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
              supports {
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
  return <IdeaListUI ideaTokens={ideaTokens} />;
};

export default IdeaList;
