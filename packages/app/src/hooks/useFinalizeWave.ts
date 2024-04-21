import { useWriteContract } from "wagmi";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { configAddresses } from "@/lib/constants";
import { client } from "@/lib/viem";

export const useFinalizeWave = () => {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const finalizeWave = async () => {
    const [, , winningIds] = await client.readContract({
      address: configAddresses.IdeaTokenHub as `0x${string}`,
      abi: IdeaTokenHubABI,
      functionName: "getWinningIdeaIds",
    });

    const winningIdeaDescriptionsResponse = await getIdeaDescriptions(
      winningIds
    );
    const winningIdeaDescriptions =
      winningIdeaDescriptionsResponse.ideaTokens.map(
        (idea: any) => idea.description
      );

    writeContract({
      chainId: 84532,
      address: configAddresses.PropLotHarness as `0x${string}`,
      abi: IdeaTokenHubABI,
      functionName: "finalizeWave",
      // args --
      // winningIds
      // descriptions
      args: [[BigInt(1)], ["test"]],
      //   args: [winningIds, winningIdeaDescriptions],
    });
  };

  return { finalizeWave, hash, isPending, error };
};

const getIdeaDescriptions = async (ids: readonly bigint[]) => {
  const query = `
     query GetIdeaTokensByIds($ideaTokenIds: [BigInt]!) {
            ideaTokens(where: {id_in: $ideaTokenIds}) {
                description
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
      variables: { ideaTokenIds: ids.map((id) => id.toString()) },
    }),
  };

  const data = await fetch("http://localhost:42069", graphqlRequest);
  const json = await data.json();
  return json.data;
};
