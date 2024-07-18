import { client } from "@/lib/viem";
import { configAddresses } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";

const getURI = async (id: BigInt) => {
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
  let uri = await getURI(id);
  const b64Uri = uri.split(",")[1];
  const decodedUri = atob(b64Uri);
  const jsonUri = JSON.parse(decodedUri);
  const svg = jsonUri.image;

  return <img src={svg} className={className} />;
};

export default IdeaNFT;
