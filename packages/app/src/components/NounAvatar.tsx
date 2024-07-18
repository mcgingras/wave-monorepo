import Image from "next/image";
import { resolveIdentifier as getContractWithIdentifier } from "@/lib/camp/contracts";
import { buildDataUriFromSeed } from "@/lib/camp/assets";
import { useReadContract } from "wagmi";

const getNounDataUri = (seed: any, { transparent = false } = {}) => {
  if (!seed) return null;
  return buildDataUriFromSeed(seed, { transparent });
};

const NounAvatar = ({
  id,
  transparent = false,
  signatureFallback = true,
  ...props
}: {
  id: any;
  transparent?: boolean;
  signatureFallback?: boolean;
  [key: string]: any;
}) => {
  const address = getContractWithIdentifier(1, "token").address;
  const { data: seed, error } = useReadContract({
    chainId: 1,
    address,
    abi: [
      {
        inputs: [{ type: "uint256" }],
        name: "seeds",
        outputs: [
          { name: "background", type: "uint48" },
          { name: "body", type: "uint48" },
          { name: "accessory", type: "uint48" },
          { name: "head", type: "uint48" },
          { name: "glasses", type: "uint48" },
        ],
        type: "function",
      },
    ] as const,
    functionName: "seeds",
    args: [id],
  });

  const nounAvatarUrl = seed
    ? getNounDataUri(
        seed
          ? {
              // @ts-ignore
              background: seed[0],
              // @ts-ignore
              body: seed[1],
              // @ts-ignore
              accessory: seed[2],
              // @ts-ignore
              head: seed[3],
              // @ts-ignore
              glasses: seed[4],
            }
          : null,
        {
          transparent,
        }
      )
    : null;

  if (nounAvatarUrl == null)
    return <span data-fallback={true} {...props}></span>;

  return <img src={nounAvatarUrl} alt="Nouns logo" {...props} />;
};

export default NounAvatar;
