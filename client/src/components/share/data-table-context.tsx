import React from 'react';

// 行データを更新する関数の型を定義
type UpdateRowFunction = (updatedRow: any) => void;
type AddRowFunction = (newRow: any) => void;
type GetRowDataFunction = (rowId: string | number | undefined) => any | undefined;

// コンテキストの作成
const DataTableContext = React.createContext<{
  updateRow?: UpdateRowFunction,
  addRow?: AddRowFunction,
  getRowData?: GetRowDataFunction
}>({});
export default DataTableContext;