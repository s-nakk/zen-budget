import {Separator} from "@/components/ui/separator";
import {SidebarNav} from "@/components/share/sidebar-nav";
import React from "react";

interface SettingsLayoutProps {
  children: React.ReactNode
}

const sidebarNavItems = [
  {
    title: "プロフィール",
    href: "/settings",
  },
  {
    title: "外観",
    href: "/settings/appearance",
  },
]
export default function SettingsLayout({children}: SettingsLayoutProps) {
  return (
    <>
      <div className="lg:space-y-6 p-10 pb-16 sm md:block">
        <div className="space-y-0.5">
          <h2 className="md:text-2xl font-bold tracking-tight">設定</h2>
          <p className="text-muted-foreground hidden md:block">
            ユーザー情報やアプリケーション設定を確認・変更します。
          </p>
        </div>
        <Separator className="my-2 md:my-6"/>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems}/>
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}