import '@/styles/global.css';
import React, {PropsWithChildren} from "react";
import Header from "@/components/share/header";

export default async function RootLayout({children}: PropsWithChildren) {
  return (
    <>
      <Header/>
      <div className="pt-8">
        {children}
      </div>
    </>
  );
}
