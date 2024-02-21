import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {ErrorCode} from "react-dropzone";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function errorMessage(error: any): Error {
  let message
  if (error instanceof Error) message = error.message
  else message = String(error)
  return new Error(message);
}

export function getFileUploadErrorMessage(code: ErrorCode | string) {
  if (code === ErrorCode.FileTooLarge)
    return "ファイルサイズが大きすぎます。"
  if (code === ErrorCode.FileInvalidType)
    return "無効な拡張子です。"
  if (code === ErrorCode.TooManyFiles)
    return "複数ファイルはアップロードできません。"
  if (code === ErrorCode.FileTooSmall)
    return "ファイルサイズが小さすぎます。"

  return code;
}

export function createImageUrl(imagePath: string) {
  if (!imagePath) return '';
  return `${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${imagePath}`
}