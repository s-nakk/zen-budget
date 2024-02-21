import {RequestMethods} from "@/lib/constants/enums";
import {auth} from "../../../auth";
import {ErrorMessages} from "@/lib/constants/error-messages";
import {SessionUserInfo} from "@/lib/types/definitions";

export async function request(url: string, method: RequestMethods, params: any = null) {
  try {
    const options = method === RequestMethods.Get ? createGetOptions() : createPostOptions(params);
    console.log({options: options});
    const response = await fetch(url, options);

    // レスポンスがOK（2xx）でない場合、エラーを投げる
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    // レスポンスをJSONとして解析
    return await response.json();
  } catch (error) {
    console.error(`: ${error}`);
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    throw new Error(message);
  }
}

export function createUrlWithQueryParams(baseApiUrl: string, params: Map<string, string>): string {
  const url = new URL(baseApiUrl);
  params.forEach((value, key) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
}

function createPostOptions(body: any) {
  if (body instanceof FormData) {
    return {
      method: RequestMethods.Post,
      body: body, // FormDataの場合はそのまま設定
    };
  } else {
    return {
      method: RequestMethods.Post,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
  }
}

export function createGetOptions() {

  return {
    headers: {
      'Content-Type': 'application/json',
    },
    method: RequestMethods.Get,
  };
}

export async function getSessionUserId(): Promise<string> {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    return userId ?? "";
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSessionUserInfo(): Promise<SessionUserInfo> {
  const session = await auth();
  const user = session?.user;
  if (user && user.id && user.email && user.name) {
    return {
      userId: user.id,
      userName: user.name,
      email: user.email,
      avatarPath: user.image ? user.image : null
    }
  }
  throw new Error(ErrorMessages.SESSION_INVALID);
}

export function handleError(error: any): Error {
  console.error(error);
  let message
  if (error instanceof Error) message = error.message
  else message = String(error)
  return new Error(message);
}