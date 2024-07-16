import { client } from "@/lib/viem";
import { configAddresses } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";

const getSVG = async (id: BigInt) => {
  const svg = await client.readContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "uri",
    args: [BigInt(id.toString())],
  });

  return svg;
};

const IdeaNFT = async ({
  id,
  className,
}: {
  id: BigInt;
  className?: string;
}) => {
  let svg = await getSVG(id);

  // replace height and width with nothing
  svg = svg.replace(/height='\d+'/g, "");
  svg = svg.replace(/width='\d+'/g, "");

  console.log("svg", svg);

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: svg }}></div>
  );
};

export default IdeaNFT;
