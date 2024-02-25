'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState
} from "@tanstack/table-core";
import {flexRender, useReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React, {ReactNode, useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {DataTableFooter} from "@/components/share/data-table-footer";
import {TableRowStatuses} from "@/lib/constants/enums";
import {DataRowBase} from "@/lib/types/definitions";
import DataTableContext from "./data-table-context";

interface DataTableProps<TData extends DataRowBase> {
  columns: ColumnDef<TData>[];
  data: TData[];
  filterableColumns: { id: string; label: string, filterType: 'text' | 'select'; options?: any[] }[];
  onAddRow?: () => TData;
  addable?: boolean
  deletable?: boolean
  renderSheetContent?: () => ReactNode;
}

export function DataTable<TData extends DataRowBase>({
                                                       columns,
                                                       data,
                                                       filterableColumns,
                                                       addable = true,
                                                       deletable = true,
                                                       renderSheetContent
                                                     }: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [editedRows, setEditedRows] = useState<TData[]>([]);
  const [removedRows, setRemovedRows] = useState<TData[]>([]);
  const [addedRows, setAddedRows] = useState<TData[]>([]);
  const [rowSelection, setRowSelection] = React.useState({})
  const [tableData, setTableData] = useState(() => [...data]);
  const [tempIdCounter, setTempIdCounter] = useState(0);
  const table = useReactTable({
    data: tableData, columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    columnResizeMode: 'onChange',
    columnResizeDirection: 'rtl',
    defaultColumn: {
      size: 50,
    },
    meta: {
      addable: addable,
      deletable: deletable,
      addedRows,
      editedRows,
      removedRows,
      removeRow: (ids: string[]) => {
        if (!ids.length) return;
        const removedModels: TData[] = [];
        const removedData = tableData.filter(t => ids.some(id => id === t.id));
        removedData.forEach((removedData) => {
          removedData.status = TableRowStatuses.Removed;
        });
        setTableData((currentData) => {
          return currentData.filter(data => {
            const isTempRow = typeof data.id === 'number' && data.id <= -1;
            const isRemovedRow = removedData.find(removed => removed.id === data.id);
            return !(isTempRow ? isRemovedRow : false);
          }).map(data => {
            // 既存行のステータスを更新
            const found = removedData.find(removed => removed.id === data.id);
            if (found) {
              data.status = TableRowStatuses.Removed;
              removedModels.push(data)
            }
            return data;
          });
        });
        setRemovedRows(prev => [
          ...prev,
          ...removedModels.filter(rm => !prev.some(p => p.id === rm.id))
        ]);
        table.toggleAllPageRowsSelected(false);
      },
    }
  });

  const hasSelectColumn = !!columns.find(x => x.id === 'select');

  const renderFilterInput = (column: {
    id: string;
    label: string,
    filterType: 'text' | 'select';
    options?: any[]
  }) => {
    switch (column.filterType) {
      case 'text':
        return (
          <div className="flex items-center justify-start space-x-2 mr-2">
            <Label className="flex justify-start w-auto  whitespace-nowrap">{column.label}</Label>
            <Input
              type="text"
              onChange={(e) => table.getColumn(column.id)?.setFilterValue(e.target.value)}
              className="max-w-sm"
            />
          </div>
        );
      default:
    }
  };
  const rowStatus = (row: Row<TData>) => {
    if (row.getIsSelected()) return "selected";
    if (row.getValue<TableRowStatuses>("status") === TableRowStatuses.Removed) return "removed";
    if (row.getValue<TableRowStatuses>("status") === TableRowStatuses.Edited) return "edited";
    if (row.getValue<TableRowStatuses>("status") === TableRowStatuses.Added) return "added";
    return undefined;
  }
  const updateRow = (updatedRow: TData) => {
    if (!updatedRow) return;
    if (updatedRow.status !== TableRowStatuses.Added) {
      updatedRow.status = TableRowStatuses.Edited;
      setEditedRows(prev => {
        const isExisting = prev.some(p => p.id === updatedRow.id);
        return isExisting ? prev : [...prev, updatedRow];
      });
    }
    setTableData(currentData => {
      return currentData.map(data => data.id === updatedRow.id ? updatedRow : data);
    });
  };
  const addRow = (newRow: TData) => {
    if (!newRow) return;
    newRow.id = tempIdCounter - 1; // 仮IDを割り当て
    newRow.status = TableRowStatuses.Added;
    setTempIdCounter(tempIdCounter - 1);
    setAddedRows(prev => {
      const isExisting = prev.some(p => p.id === newRow.id);
      return isExisting ? prev : [...prev, newRow];
    });
    setTableData(currentData => [newRow, ...currentData]);
    table.toggleAllPageRowsSelected(false);
  };
  const getRowData = (rowId: string | number | undefined) => {
    if (!rowId) return null;
    return tableData.find(row => row.id === rowId);
  };

  return (
    <DataTableContext.Provider value={{updateRow, addRow, getRowData}}>
      <div className="w-full">
        <div className="flex items-center relative">
          <div className="flex items-center">
            {filterableColumns.map((column) => (
              <div key={column.id}>{renderFilterInput(column)}</div>
            ))}
          </div>
          <div className="flex items-center space-x-2 absolute right-0">
            <p className="text-sm font-medium">ページサイズ</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize}/>
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="rounded-md border mt-1">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} size={header.column.columnDef.size}
                                 minSize={header.column.columnDef.minSize} maxSize={header.column.columnDef.maxSize}>
                        {header.isPlaceholder ? null : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}
                            status={rowStatus(row)}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-50 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTableFooter table={table} hasSelectColumn={hasSelectColumn} className="mt-2"
                         renderSheetContent={renderSheetContent}/>
      </div>
    </DataTableContext.Provider>
  )
}