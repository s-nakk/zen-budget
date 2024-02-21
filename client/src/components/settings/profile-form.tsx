'use client'
import React from "react";
import PasswordChangeForm from "@/components/settings/password-change-form";
import UserInfoForm from "@/components/settings/user-info-form";


export default function ProfileForm() {

  return (
    <>
      <div className="space-y-2 lg:space-y-6">
        <UserInfoForm/>
        <PasswordChangeForm/>
      </div>
    </>
  )
}