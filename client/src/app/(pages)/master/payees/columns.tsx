'use client'

import {ColumnDef} from "@tanstack/table-core";
import {TableRowStatuses, TaxType, TaxTypesName} from "@/lib/constants/enums";
import {RiEdit2Fill} from "react-icons/ri";
import {Button} from "@/components/ui/button";
import React from "react";
import {FaCheck} from "react-icons/fa";
import {DataRowBase, FilterProps} from "@/lib/types/definitions";
import {Checkbox} from "@/components/ui/checkbox";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {tableRowStatuses} from "@/lib/types/data";
import {cn} from "@/lib/utils/utils";
import {statusVariants} from "@/styles/styles";
import {Badge, badgeVariants} from "@/components/ui/badge";

export interface Payee extends DataRowBase {
  code: number
  name: string
  invoiceNumber: string
  taxRateType: TaxType
  isDeleted: boolean
  remarks: string
}

export const payeeListColumns: ColumnDef<Payee>[] = [
  {
    id: "select",
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
    accessorKey: "isDeleted",
    size: 20,
    header: () => <p className="flex justify-center">非表示</p>,
    cell: ({row}) => {
      const isDeleted = row.getValue<boolean>("isDeleted");
      return <div className="flex justify-center items-center">
        {isDeleted && <FaCheck/>}
      </div>;
    },
  },
  {
    accessorKey: "code",
    size: 20,
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
    header: "名前",
    size: 100,
    enableResizing: true,
  },
  {
    accessorKey: "invoiceNumber",
    header: "事業者登録番号",
  },
  {
    accessorKey: "taxRateType",
    header: "税率区分",
    size: 40,
    cell: ({row}) => {
      const taxTypeValue = row.getValue<TaxType>("taxRateType");
      const displayName = TaxTypesName[taxTypeValue];
      return <span>{displayName}</span>;
    },
  },
  {
    accessorKey: "remarks",
    header: "備考",
    size: 100,
  },
  {
    accessorKey: "fill",
    header: "",
  },
  {
    accessorKey: "status",
    size: 50,
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
    id: "edit",
    size: 30,
    cell: ({row}) => {
      const payee = row.original
      return (
        <div className="flex justify-end items-center space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button type="button" variant="ghost"
                      disabled={row.getValue<TableRowStatuses>("status") === TableRowStatuses.Removed} size="icon"
                      className="bg-green-900">
                <RiEdit2Fill className="size-5"/>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  test
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" value="Pedro Duarte" className="col-span-3"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input id="username" value="@peduarte" className="col-span-3"/>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          {/*<WrappedTooltip description="行削除">*/}
          {/*  <Button type="button" variant="destructive" size="icon">*/}
          {/*    <FaTrashAlt className="size-5 "/>*/}
          {/*  </Button>*/}
          {/*</WrappedTooltip>*/}
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