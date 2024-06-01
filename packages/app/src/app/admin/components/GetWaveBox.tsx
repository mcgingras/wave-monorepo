"use client";

import { client } from "@/lib/viem";
import { configAddresses } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import Button from "@/components/ui/Button";

const GetWaveBox = () => {
  const getCurrentWaveInfo = async () => {
    const waveInfo = await client.readContract({
      address: configAddresses.IdeaTokenHub as `0x${string}`,
      abi: IdeaTokenHubABI,
      functionName: "currentWaveInfo",
    });

    console.log(waveInfo);
    return waveInfo;
  };

  return (
    <div>
      <h1>details of the wave</h1>
      <Button
        type="primary"
        title="Get wave info"
        onClick={async () => {
          getCurrentWaveInfo();
        }}
      />
    </div>
  );
};

export default GetWaveBox;
