import NewIdeaForm from "./Form";
import { configAddresses, WAVELENGTH } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import FinalizeWaveCard from "@/components/FinalizeWaveCard";
import { client } from "@/lib/viem";

export const dynamic = "force-dynamic";

const getCurrentWaveInfo = async () => {
  const waveInfo = await client.readContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "currentWaveInfo",
  });

  return waveInfo;
};

const getRemainingTime = async (endingBlock: number) => {
  const blockNumber = await client.getBlockNumber();
  const difference = parseInt(blockNumber?.toString()) - endingBlock;
  const remainingBlocks = WAVELENGTH - difference;
  const remainingSeconds = remainingBlocks * 2;
  const now = new Date();
  const remainingTime = new Date(
    now.getTime() + (remainingSeconds > 0 ? remainingSeconds : 0) * 1000
  );

  return { remainingTime, remainingSeconds };
};

const NewIdeaPage = async () => {
  const [_, endingBlock] = await getCurrentWaveInfo();
  const { remainingSeconds } = await getRemainingTime(endingBlock);

  return (
    <section className="bg-neutral-100 min-h-[calc(100vh-165px)] mt-[65px]">
      {remainingSeconds <= 0 ? (
        <div className="w-[600px] mx-auto pt-12 pb-12">
          <FinalizeWaveCard />
        </div>
      ) : (
        <NewIdeaForm />
      )}
    </section>
  );
};

export default NewIdeaPage;
