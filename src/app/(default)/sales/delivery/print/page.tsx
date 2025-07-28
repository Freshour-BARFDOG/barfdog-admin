"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/common/loader/Loader";

function PrintContent() {
  const searchParams = useSearchParams();
  // 쿼리스트링에서 "data" 파라미터만 꺼내고, 없으면 빈 문자열로
  const html = searchParams.get("data") ?? "";

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function GoodsflowPrint() {
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <PrintContent />
    </Suspense>
  )
}
