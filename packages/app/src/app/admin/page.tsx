import GetWaveBox from "./components/GetWaveBox";
import { configAddresses, WAVELENGTH } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { client } from "@/lib/viem";

const getCurrentWaveInfo = async () => {
  const waveInfo = await client.readContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "currentWaveInfo",
  });

  return waveInfo;
};

const AdminPage = async () => {
  const waveInfo = await getCurrentWaveInfo();
  console.log("waveinfo", waveInfo);
  return (
    <div className="min-h-[calc(100vh-165px)] mt-[65px] pt-12 flex flex-col">
      <section className="w-[600px] mx-auto pb-12">
        <h1>Admin page</h1>
        <p>Testing contract details</p>
        <GetWaveBox />
      </section>
    </div>
  );
};

export default AdminPage;
