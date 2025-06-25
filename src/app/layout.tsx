import { ReactNode } from "react";
import type { Metadata } from "next";
import "@/styles/reset.css";
import "@/styles/global.css";
import localFont from "next/font/local";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { themeClass } from "@/styles/theme.css";

export const metadata: Metadata = {
  title: "바프독",
  description: "바프독 관리자 페이지",
  icons: "/images/icons/favicon-develop.png",
};

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={themeClass}>
      <body className={pretendard.className}>
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
