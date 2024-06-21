import NewIdeaForm from "./Form";
import { configAddresses, WAVELENGTH } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { client } from "@/lib/viem";
import BackButton from "@/app/components/BackButton";

export const dynamic = "force-dynamic";

const getCurrentWaveInfo = async () => {
  const waveInfo = await client.readContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "getCurrentWaveInfo",
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
  //   const [_, waveInfo] = await getCurrentWaveInfo();
  //   const { remainingSeconds } = await getRemainingTime(waveInfo.endBlock);

  //   const isActive = remainingSeconds <= 0;
  const isActive = true;

  return (
    <section className="bg-neutral-100 min-h-[calc(100vh-165px)] mt-[65px]">
      <div className="container mx-auto py-12">
        <div className="flex flex-row space-x-4 items-center pb-6">
          <BackButton />
          <h2 className="polymath-disp font-bold text-2xl text-neutral-800">
            New idea
          </h2>
        </div>
        <div className=" grid grid-cols-8 gap-8">
          <div className="col-span-5">
            {!isActive ? (
              <div className="w-[600px] mx-auto pt-12 pb-12">
                <div className="bg-white border border-neutral-200 p-4 rounded-lg flex flex-col items-center justify-center space-y-2 mt-4">
                  Ideas cannot be created when the wave is not active.
                </div>
              </div>
            ) : (
              <NewIdeaForm />
            )}
          </div>
          <div className="col-span-3 bg-white rounded-xl p-4 self-start"></div>
        </div>
      </div>
    </section>
  );
};

export default NewIdeaPage;
