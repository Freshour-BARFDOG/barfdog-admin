import { goodsflowPrintAxios } from "@/api/goodsflow/goodsflowAxios";
import { NextRequest, NextResponse } from "next/server";
import qs from "qs";

export async function POST(req: NextRequest) {
  const { otp, id } = await req.json();
  try {
    const { data } = await goodsflowPrintAxios.post(
      "/dlvmgr.aspx",
      qs.stringify({
        OTP: otp,
        responseURL: `${process.env.NEXT_PUBLIC_API_URL_PRODUCT}/api/goodsFlow/postTraceResult`,
        id,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return NextResponse.json(data);
  } catch (err) {
    console.error("GoodsFlow print error:", err);
    return NextResponse.json({ message: "Failed to print" }, { status: 500 });
  }
}
