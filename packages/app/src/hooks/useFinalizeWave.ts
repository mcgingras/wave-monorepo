import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { configAddresses } from "@/lib/constants";
import { client } from "@/lib/viem";

export const useFinalizeWave = () => {
  const { data: hash, writeContractAsync, error } = useWriteContract();

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
      winningIdeaDescriptionsResponse.ideaTokens.items.map(
        (idea: any) => idea.description
      );

    const r = await writeContractAsync({
      chainId: 84532,
      address: configAddresses.IdeaTokenHub as `0x${string}`,
      abi: IdeaTokenHubABI,
      functionName: "finalizeWave",
      // args --
      // winningIds
      // descriptions
      args: [winningIds, winningIdeaDescriptions],
    });

    return { ok: true };
  };

  const { data: transactionData, isLoading: isConfirming } =
    useWaitForTransactionReceipt({
      hash,
    });

  return { finalizeWave, hash, isConfirming, error, data: transactionData };
};

const getIdeaDescriptions = async (ids: readonly bigint[]) => {
  const query = `
     query GetIdeaTokensByIds($ideaTokenIds: [BigInt]!) {
            ideaTokens(where: {id_in: $ideaTokenIds}) {
                items {
                  description
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
      variables: { ideaTokenIds: ids.map((id) => id.toString()) },
    }),
  };

  const data = await fetch(
    process.env.NEXT_PUBLIC_GRAPHQL_URL!,
    graphqlRequest
  );
  const json = await data.json();
  return json.data;
};
