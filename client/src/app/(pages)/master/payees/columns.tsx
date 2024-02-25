'use client'

import {Badge, badgeVariants} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import {Textarea} from "@/components/ui/textarea";
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
import React, {useContext, useState} from "react";
import DataTableContext from "@/components/share/data-table-context";

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
          <Sheet key={payeeId}>
            <SheetTrigger asChild>
              <Button type="button" variant="ghost"
                      disabled={row.getValue<TableRowStatuses>("status") === TableRowStatuses.Removed} size="icon"
                      className="bg-primary">
                <RiEdit2Fill className="size-5"/>
              </Button>
            </SheetTrigger>
            <PayeeSheetContent payeeId={payeeId}/>
          </Sheet>
        </div>
      )
    },
  },
]

interface PayeeSheetProps {
  payeeId?: string | number | undefined
}

export const PayeeSheetContent = (props: PayeeSheetProps) => {
  const {updateRow, addRow, getRowData} = useContext(DataTableContext);
  const sheetInitialValue = (): Payee => {
    return (
      {
        id: undefined,
        code: undefined,
        taxRateType: TaxTypes.Standard,
        name: "",
        isDeleted: false,
        invoiceNumber: "",
        remarks: "",
        status: TableRowStatuses.None
      } as Payee
    );
  }
  const getInitialPayeeState = () => {
    if (!getRowData) return null
    if (!props.payeeId) return sheetInitialValue();
    return getRowData(props.payeeId);
  };

  const [payeeState, setPayeeState] = useState(getInitialPayeeState);

  const handleSubmit = () => {
    if ((!payeeState.id || (typeof payeeState.id === "number" && payeeState.id < 0)) && addRow) addRow(payeeState);//行追加
    if (updateRow) updateRow(payeeState); // 行データの更新
    setPayeeState(getInitialPayeeState());
  };
  const TaxTypeSelectItems = () => {
    return (
      <SelectContent>
        {Object.values(TaxTypes).filter(value => typeof value === "number").map((taxType) => (
          <SelectItem key={taxType} value={taxType.toString()}>
            {TaxTypesName[taxType as keyof typeof TaxTypesName]}
          </SelectItem>
        ))}
      </SelectContent>
    );
  };

  // 入力値で状態を更新するハンドラー
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement; // 型アサーションを使用して型を限定
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setPayeeState((prevState: Payee) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleCheckboxChange = (checked: boolean) => {
    setPayeeState((prevState: Payee) => ({
      ...prevState,
      isDeleted: checked
    }));
  };
// SelectコンポーネントのonValueChangeイベント用のハンドラー
  const handleSelectChange = (value: string) => {
    setPayeeState((prevState: Payee) => ({
      ...prevState,
      taxRateType: parseInt(value, 10) as TaxTypes // 文字列を数値に変換し、TaxTypes型にキャスト
    }));
  };

  return (
    <SheetContent className="w-[400px] sm:w-[800px]">
      <SheetHeader>
        <SheetTitle>支払先</SheetTitle>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="code" className="text-right">
            コード
          </Label>
          <Input
            id="code"
            name="code"
            required={true}
            defaultValue={payeeState.code}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            名称
          </Label>
          <Input
            id="name"
            name="name"
            required={true}
            defaultValue={payeeState.name}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="invoiceNumber" className="text-right">
            事業者登録番号
          </Label>
          <Input
            id="invoiceNumber"
            name="invoiceNumber"
            defaultValue={payeeState.invoiceNumber}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="taxRateType" className="text-right">
            税率区分
          </Label>
          <Select
            name="taxRateType"
            required={true}
            defaultValue={payeeState.taxRateType?.toString()}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue/>
            </SelectTrigger>
            <TaxTypeSelectItems/>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="remarks" className="text-right">
            備考
          </Label>
          <Textarea
            id="remarks"
            name="remarks"
            defaultValue={payeeState.remarks}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="isDeleted" className="text-right">
            非表示
          </Label>
          <Checkbox
            id="isDeleted"
            name="isDeleted"
            checked={payeeState.isDeleted}
            onCheckedChange={handleCheckboxChange}
          />
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit" onClick={handleSubmit}>Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}

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