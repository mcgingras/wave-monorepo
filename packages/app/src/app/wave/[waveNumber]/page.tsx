import { Suspense } from "react";
import IdeaList from "./components/IdeaList";
import SupportersList from "../../components/SupportersList";
import WaveStats from "./components/WaveStats";

// clears out next-js cache for viem calls
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "only-no-store";

const LoadingCard = () => {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WavePage = async ({
  params: { waveNumber },
}: {
  params: { waveNumber: string };
}) => {
  return (
    <div className="min-h-[calc(100vh-72px)] mt-[72px] pt-12 flex flex-col bg-neutral-100">
      <section className="container mx-auto pb-12 grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <h2 className="polymath-disp font-bold text-2xl text-neutral-800 pt-4">
            Submissions
          </h2>
          <Suspense
            fallback={
              <div className="mt-4">
                <LoadingCard />
              </div>
            }
          >
            <IdeaList waveNumber={BigInt(waveNumber)} />
          </Suspense>
        </div>
        <div className="col-start-9 col-span-4 sticky top-4">
          <Suspense fallback={<LoadingCard />}>
            <WaveStats waveNumber={BigInt(waveNumber)} />
          </Suspense>
          <Suspense fallback={<LoadingCard />}>
            <SupportersList />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default WavePage;
