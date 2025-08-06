import "@/styles/reset.css";
import "@/styles/global.css";
import { themeClass } from "@/styles/theme.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import AdminLayout from "@/components/layout/AdminLayout";
import localFont from 'next/font/local';
import ReactQueryProviders from "@/providers/ReactQueryProvider";
import Toast from "@/components/common/toast/Toast";

export const metadata: Metadata = {
  title: "바프독 관리자",
  description: "바프독 관리자 페이지",
  icons: "/images/icons/admin_favicon.svg",
};

const pretendard = localFont({
  src: "../../../public/fonts/PretendardVariable.woff2",
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
        <ReactQueryProviders>
          <AdminLayout>
            {children}
            <Toast />
            <div id="modal-root" />
          </AdminLayout>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
