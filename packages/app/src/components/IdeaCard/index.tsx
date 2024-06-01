import { truncateEthAddress } from "@/lib/utils";
import { IdeaToken } from "@/models/IdeaToken/types";
import SupportButton from "./SupportButton";

const IdeaCard = ({ ideaToken }: { ideaToken: IdeaToken }) => {
  return (
    <div className="bg-white rounded-2xl flex flex-col border border-transparent hover:border-neutral-200 cursor-pointer transition-all">
      <div className="flex flex-row justify-between items-center border-b border-neutral-100 p-4">
        <div className="flex flex-col space-y-1">
          <h2 className="text-lg text-neutral-800 polymath-disp font-bold tracking-wide">
            {ideaToken.title}
          </h2>
          <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start">
            {truncateEthAddress(ideaToken.author)}
          </span>
        </div>
        <div className="self-start">
          <SupportButton ideaId={ideaToken.id} />
        </div>
      </div>
      <div className="flex flex-col p-4 border-b border-neutral-100">
        <h3 className="text-xs uppercase text-neutral-400 font-bold polymath-disp tracking-wider">
          Description
        </h3>
        <p className="text-neutral-500 mt-2 text-sm">{ideaToken.description}</p>
      </div>
      <div className="flex flex-col p-4 border-b border-neutral-100">
        <h3 className="text-xs uppercase text-neutral-400 font-bold polymath-disp tracking-wider">
          Actions
        </h3>
        <div className="bg-neutral-100 p-2 mt-2 rounded"></div>
      </div>
      <div className="flex flex-col p-4">
        <h3 className="text-xs uppercase text-neutral-400 font-bold polymath-disp tracking-wider">
          Supporters
        </h3>
        <div className="mt-2 grid grid-cols-3 gap-4">
          <div className="space-x-2 flex flex-row items-center">
            <span className="bg-neutral-200 h-6 w-6 rounded-full block"></span>
            <p>lilfrog.eth</p>
            <p className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start">
              1
            </p>
          </div>
          <div className="space-x-2 flex flex-row items-center">
            <span className="bg-neutral-200 h-6 w-6 rounded-full block"></span>
            <p>lilfrog.eth</p>
            <p className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start">
              1
            </p>
          </div>
          <div className="space-x-2 flex flex-row items-center">
            <span className="bg-neutral-200 h-6 w-6 rounded-full block"></span>
            <p>lilfrog.eth</p>
            <p className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start">
              1
            </p>
          </div>
          <div className="space-x-2 flex flex-row items-center">
            <span className="bg-neutral-200 h-6 w-6 rounded-full block"></span>
            <p>lilfrog.eth</p>
            <p className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start">
              1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
