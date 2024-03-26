import WaveIcon from "@/components/icons/Wave";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/Table";
import Pill from "@/components/ui/Pill";

const CompletedWaveContainer = () => {
  const MOCK_IDEAS = [
    {
      sender: "0xabc123",
      title: "Penguins 1",
    },
    {
      sender: "0xabc123",
      title: "Penguins 1",
    },
    {
      sender: "0xabc123",
      title: "Penguins 1",
    },
  ];
  return (
    <div className="rounded border p-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row space-x-4 items-center">
          <WaveIcon className="w-12 h-12" />
          <div className="flex flex-col">
            <h2 className="font-semibold text-xl">Wave 6</h2>
            <p className="text-[#71717A]">Ended on 23 Jan, 2024. 10:30PM EST</p>
          </div>
        </div>
        <div className="space-x-2">
          <Pill title="Received: 10" />
          <Pill title="Sent onchain: 10" />
          <Pill title="Rewards: 0.345 ETH" />
        </div>
      </div>
      <section className="mt-8">
        <h4 className="text-[#71717A]">Ideas that passed onchain vote</h4>
        <Table>
          <TableBody>
            {MOCK_IDEAS.map((idea, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{idea.sender}</TableCell>
                <TableCell>{idea.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <button className="w-full bg-gray-100 py-2 rounded text-sm mt-4">
        See full wave
      </button>
    </div>
  );
};

export default CompletedWaveContainer;
