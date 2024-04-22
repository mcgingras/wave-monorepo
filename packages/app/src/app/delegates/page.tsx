import Button from "@/components/ui/Button";

const DelegatePage = () => {
  return (
    <section className="bg-neutral-100 min-h-[calc(100vh-65px)] relative">
      <div className="w-[600px] mx-auto pt-12">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl polymath-disp text-neutral-800 tracking-wide">
            Delegate
          </h1>
          <Button type="primary" title="Add delegate" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="col-span-1 bg-white p-4 rounded-lg">
            <div className="border rounded-md">
              <div className="p-2 border-b flex flex-col">
                <span className="text-xs uppercase text-neutral-400">
                  Delegate since
                </span>
                <span className="text-neutral-500 text-sm font-bold">
                  0x123...456
                </span>
              </div>
              <div className="p-2 border-b flex flex-col">
                <span className="text-xs uppercase text-neutral-400">
                  Delegate address
                </span>
                <span className="text-neutral-500 text-sm font-bold">
                  0x123...456
                </span>
              </div>
              <div className="p-2 flex flex-col">
                <span className="text-xs uppercase text-neutral-400">
                  Delegate status
                </span>
                <span className="text-neutral-500 text-sm font-bold">
                  Filled
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-white p-4 rounded-lg">
            <div className="flex flex-row justify-between">
              <span className="text-sm text-neutral-500">Unclaimed yield</span>
              <Button type="secondary" title="Claim" />
            </div>
            <span className="text-2xl text-neutral-700 font-bold mt-2">
              0.00 ETH
            </span>
          </div>
          <div className="col-span-2 bg-white p-4 rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default DelegatePage;
