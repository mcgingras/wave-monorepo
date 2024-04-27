import { truncateEthAddress } from "@/lib/utils";
import { IdeaToken } from "@/models/IdeaToken/types";
import Link from "next/link";

const AbridgedIdeaCard = ({ ideaToken }: { ideaToken: IdeaToken }) => {
  return (
    <div className="bg-white flex flex-col cursor-pointer transition-all first:rounded-t-2xl border-x border-x-transparent last:rounded-b-2xl [&:not(:last-child)]:border-b border-neutral-100 hover:border-neutral-200 hover:border-t">
      <Link href={`/idea/${ideaToken.id}`} key={ideaToken.id.toString()}>
        <div className="flex flex-row justify-between items-center p-4">
          <div className="flex flex-col space-y-1">
            <h2 className="text-lg text-neutral-800 polymath-disp font-bold tracking-wide">
              {ideaToken.title}
            </h2>
            <p className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start">
              {truncateEthAddress(ideaToken.author)}
            </p>
          </div>
          <button className="self-start bg-blue-100 text-blue-500 rounded-md px-2 py-1 hover:scale-105 transition-all">
            Support
          </button>
        </div>
      </Link>
    </div>
  );
};

export default AbridgedIdeaCard;
