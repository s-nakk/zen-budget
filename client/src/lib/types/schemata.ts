import {z} from "zod";

export const PasswordChangeSchema = z.object({
  currentPassword: z.string().min(1, "現在のパスワードを入力してください。"),
  newPassword: z.string().min(6, "新しいパスワードは6文字以上である必要があります。"),
  newPasswordConfirm: z.string().min(1, "新しいパスワード(確認)を入力してください。"),
}).refine((data) => data.newPassword === data.newPasswordConfirm, {
  message: "新しいパスワードと新しいパスワード(確認)が一致しません。",
  path: ["newPasswordConfirm"],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: "新しいパスワードは現在のパスワードと異なるようにしてください。",
  path: ["newPassword"],
});

export const UserInfoSchema = z.object({
  name: z.string().max(40, "40文字以内で入力してください。"),
  email: z.string().email("メールアドレスの形式で入力してください。(例:example@mail.co.jp)"),
  avatar: z.custom<File | null>()
});