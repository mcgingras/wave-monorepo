import { truncateEthAddress } from "@/lib/utils";
import { decodeFunctionData } from "viem";

const ParsedAction = ({ action }: { action: any }) => {
  console.log(action);

  const { functionName, args } = decodeFunctionData({
    abi: [{ inputs: "" }],
    data: action.calldata,
  });

  return (
    <pre className="text-neutral-500">{truncateEthAddress(action.target)}</pre>
  );
};

export default ParsedAction;
