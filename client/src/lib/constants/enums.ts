export const enum RequestMethods {
  Get = "GET",
  Post = "POST"
}

export const enum TaxType {
  Standard = 0,
  Reduced = 1,
  Exempt = 2
}

export const TaxTypesName = {
  [TaxType.Standard]: "標準",
  [TaxType.Reduced]: "軽減",
  [TaxType.Exempt]: "非課税"
};

export const enum TableRowStatuses {
  None = 0,
  Edited = 1,
  Added = 2,
  Removed = 3,
}

export const TableRowStatusesName = {
  [TableRowStatuses.None]: "",
  [TableRowStatuses.Edited]: "変更",
  [TableRowStatuses.Added]: "新規",
  [TableRowStatuses.Removed]: "削除"
};