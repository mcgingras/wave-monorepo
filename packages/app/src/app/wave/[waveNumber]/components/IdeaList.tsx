import { IdeaToken } from "@/models/IdeaToken/types";
import IdeaListUI from "../../../components/IdeaListUI";

const getWinningIdeasForWave = async (waveId: bigint) => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
    query GetIdeaTokensForWave($waveId: Int!) {
      ideaTokens(where: { waveId: $waveId }) {
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
      variables: { waveId: parseInt(waveId.toString()) },
    }),
  };

  const data = await fetch(url, graphqlRequest);
  const json = await data.json();
  return json.data.ideaTokens.items;
};

const IdeaList = async ({ waveNumber }: { waveNumber: bigint }) => {
  const ideaTokens = (await getWinningIdeasForWave(waveNumber)) as IdeaToken[];
  return <IdeaListUI ideaTokens={ideaTokens} />;
};

export default IdeaList;
