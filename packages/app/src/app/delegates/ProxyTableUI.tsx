"use client";

import { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import NounAvatarGroup from "@/components/NounAvatarGroup";

const ProxyTableUI = ({ data }: { data: any[] }) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorFn: (row) => row.id,
        accessorKey: "Address",
        cell: (info) => {
          return (
            <span className="text-neutral-700">
              {info.getValue() as React.ReactNode}
            </span>
          );
        },
      },
      {
        accessorFn: (row) => row.votingPower,
        accessorKey: "Nouns under delegation",
        header: () => <span>Nouns under delegation</span>,
        cell: (info) => {
          const original = info.row.original;
          const ids = original.delegators.items.map((item: any) => item.id);
          return (
            <div className="flex flex-row items-center space-x-2">
              <span className="text-neutral-700">{ids.length}</span>
              <NounAvatarGroup
                ids={ids}
                // max={3}
                // size="sm"
              />
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.votingPower,
        accessorKey: "Status",
        header: () => <span>Status</span>,
        cell: (info) => {
          console.log(info);
          const votingPower = info.getValue();
          const isActive = parseInt(String(votingPower)) > 2;
          if (isActive) {
            return (
              <span className="bg-green-100 text-green-500 rounded-full px-2 py-1 text-sm">
                Active
              </span>
            );
          } else {
            return (
              <span className="bg-neutral-100 text-neutral-700 rounded-full px-2 py-1 text-sm">
                Inactive
              </span>
            );
          }
        },
      },
    ],
    []
  );

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rows = table.getRowModel().rows;

  return (
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
                    className="text-left pb-2 pl-4 text-neutral-700 text-sm font-normal"
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
                          asc: <ChevronUpIcon className="w-4 h-4 mt-[1px]" />,
                          desc: (
                            <ChevronDownIcon className="w-4 h-4 mt-[1px]" />
                          ),
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
                  // todo
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      data-rows={rows.length === 1 ? "single" : ""}
                      data-row={
                        idx === 0
                          ? "first"
                          : idx === Math.min(rows.length - 1, 9)
                          ? "last"
                          : ""
                      }
                      key={cell.id}
                      className="
                      data-[row=first]:first:rounded-tl-xl
                      data-[row=first]:last:rounded-tr-xl
                      data-[row=last]:first:rounded-bl-xl
                      data-[row=last]:last:rounded-br-xl
                      data-[rows=single]:first:rounded-bl-xl
                      data-[rows=single]:last:rounded-br-xl
                      px-4 py-4"
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
        <div className="text-center text-neutral-400 w-full bg-white p-4 text-sm rounded-lg">
          No proxies found.
        </div>
      )}
    </div>
  );
};

export default ProxyTableUI;
