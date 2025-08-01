"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/common/loader/Loader";

function PrintContent() {
  const searchParams = useSearchParams();
  const encoded = searchParams.get("data") ?? "";

  useEffect(() => {
    if (!encoded) return;

    // 1) URI 디코딩
    const decodedHtml = decodeURIComponent(encoded);

    // 2) wrapper 요소에 innerHTML로 세팅
    const wrapper = document.createElement("div");
    wrapper.innerHTML = decodedHtml;

    // 3) 문서에 append
    document.body.appendChild(wrapper);

    // 4) 폼 찾아 바로 제출
    const form = wrapper.querySelector<HTMLFormElement>('form[name="form"]');
    form?.submit();
  }, [encoded]);

  // 실제로는 아무 UI도 렌더링하지 않으므로 null 반환
  return null;
}

export default function GoodsflowPrint() {
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <PrintContent />
    </Suspense>
  );
}
