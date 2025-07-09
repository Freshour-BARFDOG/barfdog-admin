import { goodsflowAxios } from "@/api/goodsflow/goodsflowAxios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { data } = await goodsflowAxios.post(
      `orders/partner/${process.env.NEXT_PUBLIC_GOODSFLOW_PARTNERCODE}`,
      body
    );
    return NextResponse.json(data);
  } catch (err) {
    console.error("GoodsFlow order register error:", err);
    return NextResponse.json(
      { message: "Failed to register order" },
      { status: 500 }
    );
  }
}
