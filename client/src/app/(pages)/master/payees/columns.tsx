'use client'

import {Badge, badgeVariants} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {TableRowStatuses, TaxTypes, TaxTypesName} from "@/lib/constants/enums";
import {tableRowStatuses} from "@/lib/types/data";
import {DataRowBase, FilterProps} from "@/lib/types/definitions";
import {cn} from "@/lib/utils/utils";
import {statusVariants} from "@/styles/styles";
import {ColumnDef} from "@tanstack/table-core";
import {AiFillQuestionCircle} from "react-icons/ai";
import {FaCheck} from "react-icons/fa";
import {RiEdit2Fill} from "react-icons/ri";
import React from "react";
import {PayeeSheet} from "@/components/master/payee/payee-sheet";

export interface Payee extends DataRowBase {
  code?: number
  name: string
  invoiceNumber: string
  taxRateType: TaxTypes
  isDeleted: boolean
  remarks: string
}


export const payeeListColumns: ColumnDef<Payee>[] = [
  {
    id: "select",
    size: 10,
    header: ({table}) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    size: 20,
    minSize: 20,
    header: () => <p className="flex justify-center items-center">状態</p>,
    cell: ({row}) => {
      const status = tableRowStatuses.find((status) => status.value === row.getValue<TableRowStatuses>("status"));
      if (!status) return null;
      type BadgeVariant = keyof typeof badgeVariants;
      return (
        <div className={cn(statusVariants({variant: "removed"}))}>
          <Badge variant={status.variant as BadgeVariant}>{status.label}</Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "code",
    size: 30,
    filterFn: "equalsString",
    header: () => <p className="flex justify-end pr-2">コード</p>
    //   ({column}) => {
    //   return (
    //     <div className="">
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         コード
    //         <ArrowUpDown className="ml-2 h-4 w-4"/>
    //       </Button>
    //     </div>
    //   )
    // }
    ,
    cell: ({row}) => {
      return <p className="flex justify-end pr-2">{row.getValue<number>('code')}</p>
    }
  },
  {
    accessorKey: "name",
    header: "名称",
    size: 100,
    enableResizing: true,
  },
  {
    accessorKey: "invoiceNumber",
    header: "事業者登録番号",
    size: 50
  },
  {
    accessorKey: "taxRateType",
    header: "税率区分",
    size: 30,
    cell: ({row}) => {
      const taxTypeValue = row.getValue<TaxTypes>("taxRateType");
      const displayName = TaxTypesName[taxTypeValue];
      return <span>{displayName}</span>;
    },
  },
  {
    accessorKey: "remarks",
    header: "備考",
    size: 80,
  },
  {
    accessorKey: "isDeleted",
    size: 30,
    header: () => {
      return (
        <Tooltip>
          <TooltipTrigger className="flex items-center justify-end">
            <div className="flex items-center justify-end">
              <p className="mr-1">非表示</p>
              <AiFillQuestionCircle className="size-4"/>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>他画面の選択肢から除去されます。</p>
          </TooltipContent>
        </Tooltip>
      )
    },
    cell: ({row}) => {
      const isDeleted = row.getValue<boolean>("isDeleted");
      return <div className="flex justify-center items-center">
        {isDeleted && <FaCheck/>}
      </div>;
    },
  },
  {
    id: 'fill'
  },
  {
    id: "edit",
    size: 30,
    cell: ({row}) => {
      const payeeId = row.original.id;
      return (
        <div className="flex justify-end items-center space-x-2">
          <PayeeSheet payeeId={payeeId} row={row}>
            <Button type="button" variant="ghost"
                    disabled={row?.getValue<TableRowStatuses>("status") === TableRowStatuses.Removed} size="icon"
                    className="bg-primary">
              <RiEdit2Fill className="size-5"/>
            </Button>
          </PayeeSheet>
        </div>
      )
    },
  },
]

export const payeeListFilterColumns: FilterProps[] = [
  {
    id: 'code',
    label: 'コード',
    filterType: 'text',
    options: []
  },
  {
    id: 'name',
    label: '名前',
    filterType: 'text',
    options: []
  },
]