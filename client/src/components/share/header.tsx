'use client'
import Link from "next/link";
import React from "react";
import UserNav from "@/components/share/user-nav";
import {HeaderMenu} from "@/components/share/header-menu";

export default function Header() {
  return (
    <>
      <div
        className="sticky flex lg:justify-center items-center space-x-6 h-12 lg:h-14 top-0 left-0 w-full z-50 dark:bg-neutral-950  bg-white shadow">
        <Link
          className="hidden md:block items-end justify-start mr-4"
          href={"/dashboard"}>
          <h1 className="font-bold dark:text-white">zenbudget</h1>
        </Link>
        <HeaderMenu/>
        <div className="absolute right-2 ">
          <UserNav/>
        </div>
      </div>
    </>
  )
}