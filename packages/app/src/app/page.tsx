import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Counter, Countdown } from "@/components/ui/Counter";

type Wave = {
  id: number;
  title: string;
  createdAt: string;
  author: string;
  supporters: number;
  pooledEth: number;
  rank: number;
};

export default function Home() {
  const invoices = [
    {
      id: 1,
      createdAt: "2024-01-23 10:30PM EST",
      author: "0x65A3870F48B5237...",
      title: "Penguins 1",
      supporters: 10,
      pooledEth: 10,
      rank: 1,
    },
    {
      id: 2,
      createdAt: "2024-01-23 10:30PM EST",
      author: "0x65A3870F48B5237...",
      title: "Penguins 2",
      supporters: 10,
      pooledEth: 10,
      rank: 2,
    },
  ];

  const now = new Date();
  const sevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  return (
    <section className="h-full flex items-center justify-center">
      <div className="w-[1200px]">
        <div className="w-full flex flex-row items-center justify-between mb-2">
          <div className="flex flex-row space-x-4 items-center">
            <h1 className="font-bold uppercase tracking-wider text-sm">
              Wave 1:
            </h1>
            <Countdown endDate={sevenDays} />
          </div>
          <button className="bg-white px-2 py-1 rounded-lg border text-sm text-gray-700">
            + New idea
          </button>
        </div>
        <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Rank</TableHead>
                <TableHead className="w-[100px]">Number</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-left">Title</TableHead>
                <TableHead className="text-left">Supporters</TableHead>
                <TableHead className="text-left">Pooled ETH</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} className="text-neutral-600">
                  <TableCell className="text-left ">{invoice.rank}</TableCell>
                  <TableCell className="font-medium ">{invoice.id}</TableCell>
                  <TableCell className="">{invoice.createdAt}</TableCell>
                  <TableCell className="">{invoice.author}</TableCell>
                  <TableCell className=" text-left">{invoice.title}</TableCell>
                  <TableCell className=" text-left">
                    {invoice.supporters}
                  </TableCell>
                  <TableCell className="text-left font-semibold text-green-500">
                    +{invoice.pooledEth}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
