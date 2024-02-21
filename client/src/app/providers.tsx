"use client"

import * as React from "react"
import {ThemeProvider as NextThemesProvider} from "next-themes"
import {type ThemeProviderProps} from "next-themes/dist/types"
import {SWRConfig} from "swr";
import {createGetOptions} from "@/lib/utils/api-utils";

export function ThemeProvider({children, ...props}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
export function SWRProvider({children}: { children: React.ReactNode }) {
  const fetcher = async (url: RequestInfo | URL) => {
    const res = await fetch(url, createGetOptions());

    // もしステータスコードが 200-299 の範囲内では無い場合、
    // レスポンスをパースして投げようとします。
    if (!res.ok) {
      const error: Error = new Error('An error occurred while fetching the data.');
      // エラーオブジェクトに追加情報を付与します。
      error.message = res.status && await res.json();
      throw error
    }

    return res.json()
  }

  return (
    <SWRConfig
      value={{
        //refreshInterval: 3000,
        fetcher: fetcher,
        // マウント時の再検証をやめる
        revalidateOnMount: false,
        // またそれ以外の自動再検証の設定をすべてやめる
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      {children}
    </SWRConfig>
  )
}