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
      address: configAddresses.IdeaTokenHub as `0x${string}`,
      abi: IdeaTokenHubABI,
      functionName: "finalizeWave",
      // args --
      // winningIds
      // descriptions
      args: [winningIds, winningIdeaDescriptions],
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

// cast rpc eth_call '{"to": "0xD49c56d08D3c40854c0543bA5B1747f2Ad1c7b89","from": "0x65A3870F48B5237f27f674Ec42eA1E017E111D63","data": "0x077711df00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000"}'
