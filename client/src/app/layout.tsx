import '@/styles/global.css';
import React, {PropsWithChildren} from "react";
import {inter} from "@/styles/styles";
import {ShadcnToolTipProvider, SWRProvider, ThemeProvider} from '@/app/providers'
import {auth} from "../../auth";
import {Toaster} from "@/components/ui/toaster";
import {SessionProvider} from "next-auth/react";


export default async function RootLayout({children}: PropsWithChildren) {
  const session = await auth();
  return (
    <html lang="ja" suppressHydrationWarning>
    <body className={`${inter.className} antialiased`}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ShadcnToolTipProvider>
        <SessionProvider session={session}>
          <SWRProvider>
            <main>{children}</main>
            <Toaster/>
          </SWRProvider>
        </SessionProvider>
      </ShadcnToolTipProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
