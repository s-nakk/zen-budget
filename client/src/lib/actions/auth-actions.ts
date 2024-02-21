'use server';

import {AuthError} from 'next-auth';
import {signIn, signOut} from "../../../auth";
import {User} from "@/lib/types/definitions";
import {findByEmail} from "@/app/api/user";
import {errorMessage} from "@/lib/utils/utils";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
    return "";
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'メールアドレスまたはパスワードが間違っています。'
        default:
          return 'ログインに失敗しました。'
      }
    }
    throw error;
  }
}

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const result = await findByEmail(email);
    if (result) {
      const {user, avatar_url} = result;
      return {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        avatarPath: avatar_url
      };
    } else {
      console.error('No user found with the provided email.');
      return undefined;
    }
  } catch (error) {
    throw errorMessage(error);
  }
}

export async function logout() {
  await signOut();
}