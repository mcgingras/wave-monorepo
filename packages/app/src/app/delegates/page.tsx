import Button from "@/components/ui/Button";

const DelegatePage = () => {
  return (
    <section className="bg-neutral-100 min-h-[calc(100vh-65px)] relative">
      <div className="w-[600px] mx-auto pt-12">
        <h1 className="text-xl polymath-disp text-neutral-800 tracking-wide">
          Delegate
        </h1>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="col-span-1 bg-white p-4 rounded-lg"></div>
          <div className="col-span-1 bg-white p-4 rounded-lg">
            <div className="flex flex-row justify-between">
              <span className="text-sm text-neutral-500">Unclaimed yield</span>
              <Button type="primary" title="Claim" />
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
