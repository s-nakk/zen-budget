'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import React from "react";
import {logout} from "@/lib/actions/auth-actions";
import {useSession} from "next-auth/react";

export default function UserNav() {
  const {data} = useSession();
  const user = data?.user;
  const icon = user?.image ? user.image : "https://github.com/shadcn.png";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="caret-transparent lg:right-4">
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="hover:opacity-80 h-8 w-8 lg:h-9 lg:w-9">
            <AvatarImage src={icon} alt={"userIcon"}/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>
            <Link href="/settings">プロフィール</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem className="h-7" asChild>
            <form action={logout}>
              <Button variant="ghost" size="sm" className="w-full h-7">
                ログアウト
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}