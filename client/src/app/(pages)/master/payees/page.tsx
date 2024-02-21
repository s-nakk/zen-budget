'use client'

import {Payee, payeeListColumns, payeeListFilterColumns} from "@/app/(pages)/master/payees/columns";
import {DataTable} from "@/components/share/data-table";
import {TableRowStatuses, TaxType} from "@/lib/constants/enums";

async function getData(): Promise<Payee[]> {
  // ダミーデータを生成するための配列を作成し、20件のデータを追加します。
  return Array.from({length: 20}, (_, index) => ({
    id: `dummyId${index}`,
    status: TableRowStatuses.None,
    isDeleted: index / 2 === 1,
    code: index + 1,
    name: `Payee${index + 1}`,
    taxRateType: TaxType.Standard,
    invoiceNumber: `T123456789${index}`,
    remarks: `remarks${index}`
  }));
}

const addRow = (): Payee => {
  return {
    status: TableRowStatuses.Added,
    isDeleted: false,
    code: 99,
    name: `Payee99`,
    taxRateType: TaxType.Standard,
    invoiceNumber: `T12345678999`,
    remarks: `remarks99`
  }
}

export default async function PayeesList() {
  const data = await getData();
  return (
    <div className="container hidden h-full flex-1 flex-col p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">支払先</h2>
          <p className="text-muted-foreground">
            支出入力の際に選択する支払先を管理します。
          </p>
        </div>
      </div>
      <div className="py-10">
        <DataTable<Payee> columns={payeeListColumns} filterableColumns={payeeListFilterColumns} data={data}
                          onAddRow={addRow}/>
      </div>
    </div>

  )
}