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

const ProxyTableUI = ({ data }: { data: any[] }) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorFn: (row) => row.owner,
        accessorKey: "Address",
        cell: (info) => {
          return <></>;
        },
      },
      {
        accessorFn: (row) => 0,
        accessorKey: "Total nouns",
        header: () => <span>Total nouns</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => 0,
        accessorKey: "Status",
        header: () => <span>Status</span>,
        cell: (info) => info.getValue(),
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
    <div className="p-2 block max-w-full overflow-x-scroll overflow-y-hidden">
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
