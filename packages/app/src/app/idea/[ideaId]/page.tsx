"use client";
import { useIdeaToken } from "@/models/IdeaToken/hooks";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { configAddresses } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { parseEther } from "viem";
import IdeaCard from "@/components/IdeaCard";
import IdeaCardSkeleton from "@/components/IdeaCard/Skeleton";
import AbridgedIdeaCard from "@/components/IdeaCard/Abridged";

const IdeaPage = ({ params }: { params: { ideaId: bigint } }) => {
  const { ideaToken, isLoading } = useIdeaToken(params.ideaId);

  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const supportIdea = async () => {
    writeContract({
      chainId: 84532,
      address: configAddresses.IdeaTokenHub as `0x${string}`,
      abi: IdeaTokenHubABI,
      value: parseEther(".001"),
      functionName: "sponsorIdea",
      args: [params.ideaId],
    });
  };

  return (
    <div className="h-full bg-neutral-100 py-12">
      <section className="w-[600px] mx-auto space-y-4">
        {ideaToken ? <IdeaCard ideaToken={ideaToken} /> : <IdeaCardSkeleton />}
        {ideaToken ? (
          <AbridgedIdeaCard ideaToken={ideaToken} />
        ) : (
          <IdeaCardSkeleton />
        )}
      </section>
    </div>
  );
};

export default IdeaPage;
