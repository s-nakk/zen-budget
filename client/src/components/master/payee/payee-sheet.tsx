import {Row} from "@tanstack/table-core";
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import React, {ReactNode, useContext, useEffect, useState} from "react";
import {Payee} from "@/app/(pages)/master/payees/columns";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import DataTableContext from "@/components/share/data-table-context";
import {TableRowStatuses, TaxTypes, TaxTypesName} from "@/lib/constants/enums";
import {PayeeSchema} from "@/lib/types/schemata";
import {toast} from "@/components/ui/use-toast";
import {ErrorMessages} from "@/lib/constants/error-messages";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Messages} from "@/lib/constants/messages";

interface PayeeSheetProps {
  payeeId?: string | number | undefined,
  row?: Row<Payee>,
  children: ReactNode;
}

export const PayeeSheet = ({payeeId, children}: PayeeSheetProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const {updateRow, addRow, getRowData} = useContext(DataTableContext);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
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
  const getPayeeState = () => {
    if (!getRowData) return null
    if (!payeeId) return sheetInitialValue();
    return getRowData(payeeId);
  };
  const [payeeState, setPayeeState] = useState(getPayeeState);
  const [initPayeeState, setInitPayeeState] = useState();

  useEffect(() => {
    console.log("effect");
    setPayeeState(getPayeeState());
    setInitPayeeState(getPayeeState);
  }, []);

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setIsAlertDialogOpen(false); // シートを閉じる際にはAlertDialogも閉じる
  };

  const handleOpenAlertDialog = () => {
    setIsAlertDialogOpen(true); // AlertDialogを開く
  };

  const handleConfirmClose = () => {
    setPayeeState(getPayeeState);
    handleCloseSheet(); // 実際にシートを閉じる処理
  };

  const handleCancelClose = () => {
    setIsAlertDialogOpen(false); // キャンセル時はAlertDialogを閉じる
  };

  const onOpenChange = () => {
    if (isSheetOpen) {
      if (initPayeeState !== payeeState)
        handleOpenAlertDialog(); // シートが開いている場合はAlertDialogを開く
      else
        setIsSheetOpen(false); // シートが閉じている場合はシートを開く
    } else {
      setIsSheetOpen(true); // シートが閉じている場合はシートを開く
    }
  };

  const handleSubmit = () => {
    const result = PayeeSchema.safeParse(payeeState);
    console.log("handleSubmit");
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
    console.log({payeeState: payeeState});
    if (updateRow) updateRow(payeeState); // 行データの更新
    handleCloseSheet();
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

  const handleSelectChange = (value: string) => {
    setPayeeState((prevState: Payee) => ({
      ...prevState,
      taxRateType: parseInt(value, 10) as TaxTypes // 文字列を数値に変換し、TaxTypes型にキャスト
    }));
  };
  return (
    <>
      <Sheet key={payeeId} open={isSheetOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
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
      </Sheet>
      {isAlertDialogOpen && (
        <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{Messages.CONFIRM_CLOSE}</AlertDialogTitle>
              <AlertDialogDescription>
                {Messages.CONFIRM_CLOSE_DESCRIPTION}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelClose}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmClose}>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}