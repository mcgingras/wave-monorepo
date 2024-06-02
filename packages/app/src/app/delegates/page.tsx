import { Suspense } from "react";
import DelegateProxies from "./DelegateProxies";
import Upper from "./Upper";

const DelegatePage = () => {
  return (
    <div className="min-h-[calc(100vh-165px)] mt-[65px] flex flex-col">
      <Upper />
      <section className="bg-neutral-100 py-8 grow flex-1">
        <div className="w-[600px] mx-auto">
          <h2 className="polymath-disp font-bold text-neutral-800 tracking-wide mb-4 text-lg">
            All delegate proxies
          </h2>
          <Suspense fallback={<p>Loading proxies...</p>}>
            <DelegateProxies />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default DelegatePage;
