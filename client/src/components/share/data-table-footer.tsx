import {Button} from "@/components/ui/button";
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import React, {ReactNode} from "react";
import {Table} from "@tanstack/table-core";
import {cn} from "@/lib/utils/utils";
import {Messages} from "@/lib/constants/messages";

interface DataTableFooterProps<TData> {
  table: Table<TData>;
  hasSelectColumn: boolean
  className?: string
  renderSheetContent?: () => ReactNode;
}

interface DataTableFooterProps<TData> {
  table: Table<TData>;
  hasSelectColumn: boolean
  className?: string
  renderSheetContent?: () => ReactNode;
}

export function DataTableFooter<TData>({
                                         table,
                                         hasSelectColumn,
                                         className,
                                         renderSheetContent
                                       }: DataTableFooterProps<TData>) {
  const handleSubmit = () => {
    console.log({added: table.options.meta?.addedRows})
    console.log({edited: table.options.meta?.editedRows})
    console.log({removed: table.options.meta?.removedRows})
  }
  return (
    <div className="space-y-2 relative">
      <div className={cn("flex items-center space-x-2", className)}>
        {
          <div className="flex space-x-2 ">
            {
              table.options.meta?.addable &&
              renderSheetContent && renderSheetContent()
            }
            {
              table.options.meta?.deletable &&
                <Button variant="default" disabled={!table.options.data.length}
                        className="text-destructive-foreground bg-destructive hover:bg-destructive/50" onClick={() => {
                  const ids = table.getSelectedRowModel().rows.map(row => {
                    console.log({original: row.original});
                    // @ts-ignore
                    return row.original.id.toString()
                  });
                  table.options.meta?.removeRow(ids)
                }
                }>削除</Button>
            }
          </div>
        }
        <div className="absolute inset-0 flex items-start justify-center mx-auto max-w-screen-xl">
          <Button type="submit" size="lg" variant="default"
                  onClick={handleSubmit}>{Messages.REGISTER}</Button>
        </div>
        <div className="absolute right-1 flex justify-end items-center space-x-2">
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
      {hasSelectColumn ?
        <div className="flex text-sm text-muted-foreground">
          {`${table.getFilteredRowModel().rows.length} 件中 
            ${table.getFilteredSelectedRowModel().rows.length} 件選択しています。`}
        </div>
        : <></>}
    </div>
  )
}