import { Support } from "@/models/Supporter/types";
import { formatUnits } from "viem";
import AvatarAddress from "@/components/ui/AvatarAddress";

const SupportListUI = async ({
  supports,
  options = { withIdeaId: true },
}: {
  supports: Support[];
  options?: {
    withIdeaId: boolean;
  };
}) => {
  return (
    <div className="mt-8 rounded-lg">
      <div className="border-b pb-2 border-neutral-200">
        <h3 className="text-neutral-500 text-sm font-normal">
          {supports.length} Supporter{supports.length !== 1 ? "s" : ""}
        </h3>
      </div>
      <div className="mt-4 space-y-4">
        {supports.length > 0 ? (
          supports.map((support, idx) => {
            return (
              <div key={`supporters-${idx}`}>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center space-x-2">
                    <AvatarAddress
                      address={support.supporterId as `0x${string}`}
                      size="sm"
                    />
                    {options.withIdeaId && (
                      <span className="text-neutral-500 bg-neutral-200 rounded-full px-3 py-0.5 text-xs">
                        Idea {support.tokenId.toString()}
                      </span>
                    )}
                  </div>
                  <span className="text-neutral-500">
                    {formatUnits(BigInt(support.balance.toString()), 18)} ETH
                  </span>
                </div>
                <p className="text-neutral-700 mt-1 text-sm">
                  {support.reason}
                </p>
              </div>
            );
          })
        ) : (
          <div className="mt-4 text-neutral-500 text-sm font-normal">
            <p className="text-neutral-500 text-center">No supporters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportListUI;
