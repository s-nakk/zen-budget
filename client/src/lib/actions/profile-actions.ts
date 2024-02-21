'use server';

import {ExecuteResult, ProfileUpdateResult} from "@/lib/types/definitions";
import {findById, updatePassword, UpdatePasswordParams, updateUser} from "@/app/api/user";
import {z} from "zod";
import bcrypt from "bcryptjs";
import {PasswordChangeSchema, UserInfoSchema} from "@/lib/types/schemata";
import {getSessionUserId, getSessionUserInfo, handleError} from "@/lib/utils/api-utils";
import {ErrorMessages} from "@/lib/constants/error-messages";
import {Messages} from "@/lib/constants/messages";
import {FeatureNames} from "@/lib/constants/features";

export async function getUserById() {
  const userId = await getSessionUserId();
  try {
    const results = await findById(userId);
    if (results) {
      const {user, avatar_url} = results;
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarPath: avatar_url,
      };
    }
  } catch (error) {
    throw handleError(error);
  }
}

export async function savePassword(formData: z.infer<typeof PasswordChangeSchema>): Promise<ExecuteResult> {
  const validatedFields = PasswordChangeSchema.safeParse({
    currentPassword: formData.currentPassword,
    newPassword: formData.newPassword,
    newPasswordConfirm: formData.newPasswordConfirm,
  });

  if (!validatedFields.success) {
    return {
      title: ErrorMessages.ERROR,
      success: false,
      message: validatedFields.error.message
    };
  }
  const {currentPassword, newPassword} = validatedFields.data;

  try {
    const user = await getSessionUserInfo();
    const results = await findById(user.userId);
    if (!results || results.length == 0) {
      return {
        title: ErrorMessages.ERROR,
        success: false,
        message: ErrorMessages.USER_FETCH_ERROR
      };
    }
    const password = results[0].password;
    const passwordsMatch = await bcrypt.compare(currentPassword, password);
    if (!passwordsMatch) {
      return {
        title: ErrorMessages.ERROR,
        success: false,
        message: ErrorMessages.PASSWORD_MISMATCH
      };
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatePasswordParams: UpdatePasswordParams = {
      id: user.userId,
      updated_by: FeatureNames.PASSWORD_CHANGE,
      password: hashedPassword
    };
    await updatePassword(updatePasswordParams);
    return {
      title: Messages.UPDATE_COMPLETE,
      success: true,
      message: Messages.PASSWORD_UPDATED
    };
  } catch (error) {
    return {
      title: ErrorMessages.ERROR,
      success: false,
      message: handleError(error).message
    };
  }
}

export async function saveUserInfo(formData: FormData): Promise<ProfileUpdateResult> {
  const validatedFields = UserInfoSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    avatar: formData.get('avatar'),
  });
  if (!validatedFields.success) {
    return {
      user: {
        name: "",
        email: ""
      },
      detail: {
        title: ErrorMessages.ERROR,
        success: false,
        message: validatedFields.error.message
      }
    };
  }
  try {
    const user = await getSessionUserInfo();
    formData.append('id', user.userId)
    formData.append('updated_by', FeatureNames.PROFILE)
    const result = await updateUser(formData);
    if (result) {
      const {user, avatar_url} = result;
      return {
        user: {
          name: user.name,
          email: user.email,
          avatarPath: avatar_url,
        },
        detail: {
          title: Messages.UPDATE_COMPLETE,
          success: true,
          message: Messages.PROFILE_UPDATED
        }
      };
    }
    return {
      user: {
        name: "",
        email: ""
      },
      detail: {
        title: ErrorMessages.ERROR,
        success: false,
        message: ErrorMessages.UNKNOWN_ERROR
      }
    };
  } catch (error) {
    return {
      user: {
        name: "",
        email: ""
      },
      detail: {
        title: ErrorMessages.ERROR,
        success: false,
        message: handleError(error).message
      }
    };
  }
}