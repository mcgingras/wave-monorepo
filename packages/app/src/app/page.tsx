import { Suspense } from "react";
import IdeaList from "./components/CurrentIdeaList";
import SupportersList from "./components/SupportersList";
import WaveStats from "./components/WaveStats";

// clears out next-js cache for viem calls
// this might not be the "best" way but at least it's not storing stale data
// TODO: review next's caching strategies and decide on best one.
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "only-no-store";

export default async function Home() {
  return (
    <div className="min-h-[calc(100vh-165px)] mt-[65px] pt-12 flex flex-col bg-neutral-100">
      <section className="container mx-auto pb-12 grid grid-cols-8 gap-8">
        <div className="col-span-5">
          <h2 className="polymath-disp font-bold text-2xl text-neutral-800 pt-6">
            Submissions
          </h2>
          <Suspense fallback={<div>Loading...</div>}>
            <IdeaList />
          </Suspense>
        </div>
        <div className="col-span-3">
          <Suspense fallback={<div>Loading...</div>}>
            <WaveStats />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <SupportersList />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
