import "../../styles/globals.css";
import { themeClass } from "@/styles/theme.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import ReactQueryProviders from "@/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "바프독 로그인",
  description:
    "바프독 관리자 로그인 페이지",
  icons: "/images/icons/favicon-develop.png",
};

const pretendard = localFont({
  src: "../../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard"
});

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={themeClass}>
      <body className={pretendard.className}>
        <ReactQueryProviders>
          {children}
        </ReactQueryProviders>
      </body>
    </html>
  )
}
