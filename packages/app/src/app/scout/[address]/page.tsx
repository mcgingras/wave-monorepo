import Image from "next/image";

const BadgeCard = () => {
  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center justify-center border-b border-neutral-100">
        <Image
          src="/badge.svg"
          alt="temporary nft image"
          width={200}
          height={200}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xs uppercase text-neutral-500 font-bold polymath-disp tracking-wider">
          Idea #143
        </h3>
        <p className="text-sm text-neutral-400">
          Here is my reason for voting. This will be a bunch of random garbage
          here. Idk what else we want to show here, maybe some stats about if
          it's on-chain or not? Maybe how much I donated?
        </p>
      </div>
    </div>
  );
};

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
            <span>6</span>
          </div>
          <div className="flex flex-row justify-between text-neutral-400 items-center space-x-4">
            <span>% on-chain</span>
            <span className="h-1 border-b border-dotted border-neutral-400 flex-grow"></span>
            <span>33%</span>
          </div>
        </div>
      </section>
      <section className="bg-neutral-100 py-8 grow flex-1">
        <div className="w-[600px] mx-auto space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <BadgeCard />
            <BadgeCard />
            <BadgeCard />
            <BadgeCard />
            <BadgeCard />
            <BadgeCard />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScoutPage;
