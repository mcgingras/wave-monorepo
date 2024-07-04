"use client";

import { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const DelegateTable = ({ data }: { data: any[] }) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorFn: (row) => row.owner,
        accessorKey: "Delegation from",
        cell: (info) => {
          return <></>;
        },
      },
      {
        accessorFn: (row) => 0,
        accessorKey: "Proxy",
        header: () => <span>Proxy</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => 0,
        accessorKey: "Yield earned",
        header: () => <span>Yield earned</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => 0,
        accessorKey: "Registration",
        header: () => <span>Registration</span>,
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
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    // onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
    // state: {
    //   sorting,
    // },
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
                    className="text-left pb-4 pl-4 text-neutral-500"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
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
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
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
                      data-special={
                        idx === 0
                          ? "first"
                          : idx === Math.min(rows.length - 1, 9)
                          ? "last"
                          : ""
                      }
                      key={cell.id}
                      className="data-[special=first]:first:rounded-tl-xl data-[special=first]:last:rounded-tr-xl data-[special=last]:first:rounded-bl-xl data-[special=last]:last:rounded-br-xl px-4 py-8"
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
          No delegates found.
        </div>
      )}
    </div>
  );
};

export default DelegateTable;
