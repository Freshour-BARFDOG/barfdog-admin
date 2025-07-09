import { goodsflowPrintAxios } from "@/api/goodsflow/goodsflowAxios";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import qs from "qs";

export async function POST(req: NextRequest) {
  const { otp } = await req.json();
  try {
    const { data } = await axios.post(
      `https://ds.goodsflow.com/print/contract/List.aspx`,
      qs.stringify({ OTP: otp }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return NextResponse.json(data);
  } catch (err) {
    console.error("GoodsFlow contract list error:", err);
    return NextResponse.json(
      { message: "Failed to get contract list" },
      { status: 500 }
    );
  }
}
