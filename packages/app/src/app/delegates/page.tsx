import { Suspense } from "react";
import DelegateProxies from "./DelegateProxies";
import Upper from "./Upper";
import ProxyTable from "./ProxyTable";
import DelegateTable from "./DelegateTable";
import Hero from "./Hero";

const DelegatePage = () => {
  return (
    <div className="min-h-[calc(100vh-72px)] mt-[72px] pt-12 flex flex-col bg-neutral-100">
      <div className="container mx-auto pb-12">
        <Hero />
        <section className="mt-12">
          <h3 className="polymath-disp font-bold text-2xl text-neutral-800">
            Delegate proxies
          </h3>
          <Suspense fallback={"loading"}>
            <ProxyTable />
          </Suspense>
        </section>
        <section className="mt-12">
          <h3 className="polymath-disp font-bold text-2xl text-neutral-800">
            Current delegates
          </h3>
          <DelegateTable />
        </section>
      </div>
    </div>
  );
};

export default DelegatePage;
