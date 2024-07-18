import { IdeaToken } from "@/models/IdeaToken/types";
import { Support } from "@/models/Supporter/types";
import SupportListUI from "../../../components/SupportListUI";

const getSupporters = async (waveId: string) => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
  query GetSupporters($waveId: Int!) {
    ideaTokens(where: {waveId: $waveId}) {
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
      variables: { waveId: parseInt(waveId) },
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

const SupportList = async ({ waveNumber }: { waveNumber: string }) => {
  const ideaTokens = (await getSupporters(waveNumber)) as IdeaToken[];
  const supports = ideaTokens.reduce((acc, ideaToken) => {
    return acc.concat(ideaToken.supports.items);
  }, [] as Support[]);

  return <SupportListUI supports={supports} />;
};

export default SupportList;
