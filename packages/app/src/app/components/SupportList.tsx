import { IdeaToken } from "@/models/IdeaToken/types";
import { Support } from "@/models/Supporter/types";
import SupportListUI from "./SupportListUI";

const getSupporters = async () => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
  query GetSupporters {
    ideaTokens(where: {isArchived: false}) {
      items {
        supports {
          items {
            balance
            supporterId
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
  const supports = ideaTokens.reduce((acc, ideaToken) => {
    return acc.concat(ideaToken.supports.items);
  }, [] as Support[]);

  return <SupportListUI supports={supports} />;
};

export default SupportersList;
