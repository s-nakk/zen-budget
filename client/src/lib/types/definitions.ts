// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

import {TableRowStatuses} from "@/lib/constants/enums";

export interface EntityBase {
  id: string | null;
  user_id?: string;
  updated_by?: string;
}

export interface SessionUserInfo {
  userId: string;
  userName: string;
  email: string;
  avatarPath?: string | null;
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarPath?: string;
};

export type UserInfo = {
  email: string
  name: string
  avatarPath?: string
}
export type ExecuteResult = {
  title: string
  message: string
  success: boolean
}

export type ToastProps = {
  title: string
  description: string
  isSuccess?: boolean
}

export interface FileWithPreview extends File {
  preview: string;
}

export type ProfileUpdateResult = {
  user: UserInfo
  detail: ExecuteResult
}

export type FilterProps =
  {
    id: string;
    label: string;
    filterType: 'text' | 'select';
    options?: any[]
  };

export interface DataRowBase {
  id?: string | number
  status: TableRowStatuses;
}

export interface WithId {
  id: number | string;
}

declare module '@tanstack/table-core' {
  interface TableMeta<TData> {
    addable: boolean;
    deletable: boolean;
    editedRows: { [key: string]: any };
    removedRows: { [key: string]: any };
    addedRows: { [key: string]: any };
    removeRow: (ids: string[]) => void;
  }
}