import {createUrlWithQueryParams, request} from "@/lib/utils/api-utils";
import {RequestMethods} from "@/lib/constants/enums";
import {EntityBase} from "@/lib/types/definitions";

const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const findByEmail = async (email: string) => {
  const param = new Map<string, string>;
  param.set('email', email);
  const url = createUrlWithQueryParams(`${baseApiUrl}/users/find_by_email`, param);
  return await request(url, RequestMethods.Get);
}
export const findById = async (id: string) => {
  const url = `${baseApiUrl}/users/find_with_avatar/${id}`
  return await request(url, RequestMethods.Get);
}

export interface UpdatePasswordParams extends EntityBase {
  password: string
}

export const updatePassword = async (params: UpdatePasswordParams) => {
  await request(`${baseApiUrl}/users/update_password`, RequestMethods.Post, params);
}

export interface UpdateUserParams extends EntityBase {
  name: string;
  email: string;
  avatar: File | null,

}

export const updateUser = async (params: FormData) => {
  try {
    return await request(`${baseApiUrl}/users/update_user`, RequestMethods.Post, params);
  } catch (error) {
    throw error;
  }
};