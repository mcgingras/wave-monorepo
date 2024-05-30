import NewIdeaForm from "./Form";
import { configAddresses, WAVELENGTH } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
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

  //   const isActive = remainingSeconds <= 0;
  const isActive = true;

  return (
    <section className="bg-neutral-100 min-h-[calc(100vh-165px)] mt-[65px]">
      {!isActive ? (
        <div className="w-[600px] mx-auto pt-12 pb-12">
          <div className="bg-white border border-neutral-200 p-4 rounded-lg flex flex-col items-center justify-center space-y-2 mt-4">
            Ideas cannot be created when the wave is not active.
          </div>
        </div>
      ) : (
        <NewIdeaForm />
      )}
    </section>
  );
};

export default NewIdeaPage;
