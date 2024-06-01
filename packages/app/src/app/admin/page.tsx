import GetWaveBox from "./components/GetWaveBox";
import { configAddresses, WAVELENGTH } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { client } from "@/lib/viem";

import AbridgedList from "@/components/IdeaCard/AbridgedList";
import ExpandableIdeaCard from "@/components/IdeaCard/Expandable";
import IdeaCard from "@/components/IdeaCard";

const getCurrentWaveInfo = async () => {
  const waveInfo = await client.readContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "currentWaveInfo",
  });

  return waveInfo;
};

const getIdeas = async () => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
    query GetIdeaTokens {
      ideaTokens {
            id
            author
            title
            description
            createdAt
            actions
            isArchived
            supporters {
                balance
                owner
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
      cache: "no-cache",
    }),
  };

  const data = await fetch(url, graphqlRequest);
  const json = await data.json();
  return json.data.ideaTokens;
};

const AdminPage = async () => {
  const ideas = await getIdeas();
  const firstIdea = ideas[4];
  console.log(firstIdea);
  return (
    <div className="min-h-[calc(100vh-165px)] mt-[65px] pt-12 flex flex-col bg-neutral-100">
      <section className="w-[600px] mx-auto pb-12">
        <AbridgedList ideas={ideas} />
        <div className="h-12"></div>
        <ExpandableIdeaCard ideaToken={firstIdea} />
        <div className="h-12"></div>
        <IdeaCard ideaToken={firstIdea} />
      </section>
    </div>
  );
};

export default AdminPage;
