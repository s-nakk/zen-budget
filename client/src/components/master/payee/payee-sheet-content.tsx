import React, {useContext, useState} from "react";
import DataTableContext from "@/components/share/data-table-context";
import {TableRowStatuses, TaxTypes, TaxTypesName} from "@/lib/constants/enums";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {SheetContent, SheetFooter, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Payee} from "@/app/(pages)/master/payees/columns";
import {PayeeSchema} from "@/lib/types/schemata";
import {toast} from "@/components/ui/use-toast";
import {ErrorMessages} from "@/lib/constants/error-messages";

interface PayeeSheetProps {
  payeeId?: string | number | undefined
  onClose: () => void;
}

export const PayeeSheetContent = ({payeeId, onClose}: PayeeSheetProps) => {
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
    if (!payeeId) return sheetInitialValue();
    return getRowData(payeeId);
  };

  const [payeeState, setPayeeState] = useState(getInitialPayeeState);

  const handleSubmit = () => {
    const result = PayeeSchema.safeParse(payeeState);
    if (!result.success) {
      console.log(result.error.issues);
      toast({
        title: ErrorMessages.ERROR,
        description: (
          <div>
            {result.error.issues.map((x, index) => (
              <div key={index}>{x.message}</div>
            ))}
          </div>
        ),
        variant: "destructive"
      });
      return;
    }
    if ((!payeeState.id || (typeof payeeState.id === "number" && payeeState.id < 0)) && addRow) addRow(payeeState);//行追加
    if (updateRow) updateRow(payeeState); // 行データの更新
    setPayeeState(getInitialPayeeState());
    onClose();
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
            type="number"
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
        <Button type="submit" onClick={handleSubmit}>Save changes</Button>
      </SheetFooter>
    </SheetContent>
  )
}