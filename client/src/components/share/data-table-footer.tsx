import {Button} from "@/components/ui/button";
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import React from "react";
import {Table} from "@tanstack/table-core";
import {cn} from "@/lib/utils/utils";

interface DataTableFooterProps<TData> {
  table: Table<TData>;
  hasSelectColumn: boolean
  className?: string
}

export function DataTableFooter<TData>({
                                         table,
                                         hasSelectColumn,
                                         className
                                       }: DataTableFooterProps<TData>) {
  return (
    <div className="space-y-2">
      <div className={cn("flex items-center space-x-2", className)}>
        {
          <div className="flex-1 space-x-2">
            {
              // @ts-ignore
              table.options.meta?.addable ? <Button variant="default" className="bg-green-900"
                // @ts-ignore
                                                    onClick={() => table.options.meta?.addRow()}>追加</Button> : <></>
            }
            {
              // @ts-ignore
              table.options.meta?.deletable ?
                <Button variant="default" disabled={!table.options.data.length} className="bg-red-900" onClick={() => {
                  const indexes = table.getSelectedRowModel().rows.map(row => row.index);
                  // @ts-ignore
                  table.options.meta?.removeRow(indexes)
                }
                }>削除</Button> : <></>
            }
          </div>
        }
        <div className="flex items-center space-x-2">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4"/>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4"/>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4"/>
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4"/>
          </Button>
        </div>
      </div>
      <div>
        {hasSelectColumn ?
          <div className="flex-1 text-sm text-muted-foreground">
            {`${table.getFilteredRowModel().rows.length} 件中 
            ${table.getFilteredSelectedRowModel().rows.length} 件選択しています。`}
          </div>
          : <></>}
      </div>
    </div>
  )
}