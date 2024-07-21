import { useState, useEffect } from "react";
import { configAddresses } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { useReadContract } from "wagmi";

const IdeaNFT = ({ id, className }: { id: BigInt; className?: string }) => {
  const [svg, setSvg] = useState<string>("");
  const { data: badgeSVG } = useReadContract({
    chainId: 84532,
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "uri",
    args: [BigInt(id.toString())],
  });

  useEffect(() => {
    if (badgeSVG) {
      const b64Uri = badgeSVG.split(",")[1];
      const decodedUri = atob(b64Uri);
      const jsonUri = JSON.parse(decodedUri);
      setSvg(jsonUri.image);
    }
  }, [badgeSVG]);

  if (!svg)
    return (
      <span className={`${className} animate-pulse bg-neutral-200`}></span>
    );

  return <img src={svg} className={className} />;
};

export default IdeaNFT;
