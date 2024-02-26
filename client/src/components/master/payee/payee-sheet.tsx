import {Row} from "@tanstack/table-core";
import {Sheet, SheetTrigger} from "@/components/ui/sheet";
import {PayeeSheetContent} from "@/components/master/payee/payee-sheet-content";
import React, {ReactNode, useState} from "react";
import {Payee} from "@/app/(pages)/master/payees/columns";

interface PayeeSheetProps {
  payeeId?: string | number | undefined,
  row?: Row<Payee>,
  children: ReactNode;
}

export const PayeeSheet = ({payeeId, row, children}: PayeeSheetProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCloseSheet = () => setIsSheetOpen(false);
  return (
    <Sheet key={payeeId} open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <PayeeSheetContent payeeId={payeeId} onClose={handleCloseSheet}/>
    </Sheet>
  )
}