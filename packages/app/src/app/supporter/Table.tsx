"use client";

import { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import AvatarAddress from "@/components/ui/AvatarAddress";
import { formatUnits } from "viem";
import { useRouter } from "next/navigation";
import { Supporter } from "@/models/Supporter/types";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

const Table = ({ data }: { data: Supporter[] }) => {
  const router = useRouter();
  const columns = useMemo<ColumnDef<Supporter>[]>(
    () => [
      {
        accessorFn: (row) => row.id,
        accessorKey: "Supporter",
        cell: (info) => {
          return <AvatarAddress address={info.getValue() as `0x${string}`} />;
        },
      },
      {
        id: "Ideas",
        header: () => <span>Ideas supported</span>,
        accessorFn: (row) => row.supportedIdeas.items.length,
        cell: (info) => {
          return (
            <span className="text-neutral-700">
              {info.getValue() as string}
            </span>
          );
        },
      },
      {
        id: "Proposals",
        header: () => <span>Proposals</span>,
        accessorFn: (row) =>
          row.supportedIdeas.items.filter(
            (item) => item.token.nounsProposalId !== null
          ).length,
        cell: (info) => {
          return (
            <span className="text-neutral-700">
              {info.getValue() as string}
            </span>
          );
        },
      },
      {
        id: "Passed proposals",
        header: () => <span>Passed proposals</span>,
        accessorFn: (row) =>
          row.supportedIdeas.items.filter(
            (item) => item.token.nounsProposalStatus === "passed"
          ).length,
        cell: (info) => {
          return (
            <span className="text-neutral-700">
              {info.getValue() as string}
            </span>
          );
        },
      },
      {
        id: "amount",
        header: () => <span>ETH contributed</span>,
        accessorFn: (row) =>
          row.supportedIdeas.items.reduce(
            (acc, item) => acc + parseInt(item.balance),
            0
          ),
        cell: (info) => {
          return (
            <span className="text-neutral-700">
              {formatUnits(BigInt(info.getValue() as number), 18)} ETH
            </span>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rows = table.getRowModel().rows;

  return (
    <>
      <div className="mt-4 block max-w-full overflow-x-scroll overflow-y-hidden">
        <div className="h-2" />
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="text-left pb-2 pl-4 text-neutral-500 text-sm font-normal"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "cursor-pointer select-none flex flex-row items-center"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === "asc"
                                ? "Sort ascending"
                                : header.column.getNextSortingOrder() === "desc"
                                ? "Sort descending"
                                : "Clear sort"
                              : undefined
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <ChevronUpIcon className="w-4 h-4" />,
                            desc: <ChevronDownIcon className="w-4 h-4" />,
                          }[header.column.getIsSorted() as string] ?? (
                            <span className="w-4 h-4" />
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white rounded">
            {rows.slice(0, 10).map((row, idx) => {
              return (
                <tr
                  key={row.id}
                  className="[&:not(:last-child)]:border-b cursor-pointer"
                  onClick={() => {
                    router.push(`/supporter/${row.original.id}`);
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        data-special={
                          idx === 0
                            ? "first"
                            : idx === Math.min(rows.length - 1, 9)
                            ? "last"
                            : ""
                        }
                        key={cell.id}
                        className="data-[special=first]:first:rounded-tl-xl data-[special=first]:last:rounded-tr-xl data-[special=last]:first:rounded-bl-xl data-[special=last]:last:rounded-br-xl px-4 py-4 text-neutral-700"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && (
          <div className="text-center text-neutral-500 w-full bg-white p-4 rounded-lg">
            No supporters found.
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
