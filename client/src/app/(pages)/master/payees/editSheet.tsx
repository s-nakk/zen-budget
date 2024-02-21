import {Payee} from "@/app/(pages)/master/payees/columns";
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
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {forwardRef, ReactNode} from "react";

interface PayeeSheetProps {
  data?: Payee;
  children: ReactNode;
}

// ButtonコンポーネントをforwardRefを使用して定義し直します。
const ForwardRefButton = forwardRef<HTMLButtonElement, { children: React.ReactNode, onClick?: () => void }>(({
                                                                                                               children,
                                                                                                               onClick
                                                                                                             }, ref) => (
  <Button ref={ref} onClick={onClick}>
    {children}
  </Button>
));
ForwardRefButton.displayName = "ForwardRefButton"

export function PayeeSheet({data, children}: PayeeSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when done.
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
  )
}