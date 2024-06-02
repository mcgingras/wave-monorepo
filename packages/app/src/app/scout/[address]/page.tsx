const ScoutPage = () => {
  return (
    <div className="min-h-[calc(100vh-165px)] mt-[65px] pt-12 flex flex-col">
      <section className="w-[600px] mx-auto pb-12">
        <div className="flex flex-row items-center justify-between">
          <h1 className="polymath-disp font-bold text-2xl text-neutral-800">
            Scout: lilfrog
          </h1>
        </div>
        <div className="flex flex-col space-y-4 w-full mt-4">
          <div className="flex flex-row justify-between text-neutral-400 items-center space-x-4">
            <span>Total ideas supported</span>
            <span className="h-1 border-b border-dotted border-neutral-400 flex-grow"></span>
            <span>14</span>
          </div>
          <div className="flex flex-row justify-between text-neutral-400 items-center space-x-4">
            <span>% on-chain</span>
            <span className="h-1 border-b border-dotted border-neutral-400 flex-grow"></span>
            <span>70%</span>
          </div>
        </div>
      </section>
      <section className="bg-neutral-100 py-8 grow flex-1">
        <div className="w-[600px] mx-auto space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScoutPage;
