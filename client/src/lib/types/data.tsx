import {TableRowStatuses, TableRowStatusesName} from "@/lib/constants/enums";

export const tableRowStatuses = [
  {
    value: TableRowStatuses.Edited,
    label: TableRowStatusesName[TableRowStatuses.Edited],
    variant: "edited",
  },
  {
    value: TableRowStatuses.Added,
    label: TableRowStatusesName[TableRowStatuses.Added],
    variant: "added",
  },
  {
    value: TableRowStatuses.Removed,
    label: TableRowStatusesName[TableRowStatuses.Removed],
    variant: "destructive",
  },
]