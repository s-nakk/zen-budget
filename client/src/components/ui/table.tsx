import * as React from "react"

import {cn} from "@/lib/utils/utils"
import {cva} from "class-variance-authority";

const tableRowStyles = cva(
  [
    "border-b",
    "transition-colors",
    "hover:bg-neutral-100/50",
    "dark:hover:bg-neutral-800/50",
  ],
  {
    variants: {
      status: {
        losicalDeleted: [
          "bg-gray-200",
          "hover:bg-neutral-100/50",
          "dark:bg-zinc-900",
          "dark:hover:bg-zinc-900/50",
        ],
        selected: [
          "bg-neutral-100",
          "dark:bg-neutral-800",
          "dark:hover:bg-neutral-800/50",
        ],
        added: [
          "bg-green-200",
          "dark:bg-blue-950/50 bg-transparent",
        ],
        edited: [
          "bg-blue-200",
          "dark:bg-green-950/50",
        ],
        removed: [
          "dark:text-red-900/50",
        ],
      },
    },
  }
)

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({className, ...props}, ref) => (
  <div className="relative w-full  overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-neutral-100/50 font-medium [&>tr]:last:border-b-0 dark:bg-neutral-800/50",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
  status?: 'losicalDeleted' | 'selected' | 'added' | 'edited' | 'removed'
}
>(({className, status, ...props}, ref) => (
  <tr
    ref={ref}
    className={cn(tableRowStyles({status}), className)}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & { size?: number }
>(({className, size, ...props}, ref) => (
  <th
    ref={ref}
    style={{width: size ? `${size}px` : "auto"}}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-neutral-500 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] dark:text-neutral-400",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-1.5 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({className, ...props}, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
