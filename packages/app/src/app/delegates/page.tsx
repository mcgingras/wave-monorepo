import { Suspense } from "react";
import DelegateProxies from "./DelegateProxies";
import Upper from "./Upper";
import Button from "@/components/ui/Button";
import ProxyTable from "./ProxyTable";
import DelegateTable from "./DelegateTable";

const DelegatePage = () => {
  return (
    <div className="min-h-[calc(100vh-72px)] mt-[72px] pt-12 flex flex-col bg-neutral-100">
      <div className="container mx-auto pb-12">
        <section>
          <div className="flex flex-col items-center max-w-[600px] mx-auto">
            <span className="h-20 w-20 rounded-full bg-neutral-300 block"></span>
            <p className="text-2xl font-bold mt-6">
              You have 1 noun to delegate
            </p>
            <p className="text-center text-neutral-500 text-sm mb-6 mt-2">
              Nouns delegated to Wave are used to turn ideas into proposals, and
              in turn earn a reward! Delegate your Noun to start earning.
            </p>
            <Button title="Get started" type="primary" />
          </div>
        </section>
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
