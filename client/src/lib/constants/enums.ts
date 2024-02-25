export enum RequestMethods {
  Get = "GET",
  Post = "POST"
}

export enum TaxTypes {
  Standard = 0,
  Reduced = 1,
  Exempt = 2
}

export const TaxTypesName = {
  [TaxTypes.Standard]: "標準",
  [TaxTypes.Reduced]: "軽減",
  [TaxTypes.Exempt]: "非課税"
};

export enum TableRowStatuses {
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