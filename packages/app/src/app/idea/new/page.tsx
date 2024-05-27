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

  if (remainingSeconds <= 0) {
    return (
      <section className="bg-neutral-100 min-h-[calc(100vh-165px)] mt-[65px]">
        <div className="text-center p-8">
          <p className="text-neutral-600">
            The wave has ended and no new ideas can be proposed.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-neutral-100 min-h-[calc(100vh-165px)] mt-[65px]">
      <NewIdeaForm />
    </section>
  );
};

export default NewIdeaPage;
