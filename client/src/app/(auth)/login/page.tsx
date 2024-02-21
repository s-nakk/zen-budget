'use client'
import LoginForm from "@/components/login/login-form";
import React from "react";

export default function LoginPage() {
  return (
    <>
      <main className="flex min-h-screen items-center justify-center ">
        <div className="w-full max-w-md">
          <div className="flex justify-center text-center mb-4">
            <h1 className="font-bold text-5xl dark:text-white">zenbudget</h1>
          </div>
          <LoginForm/>
        </div>
      </main>
    </>
  );
}