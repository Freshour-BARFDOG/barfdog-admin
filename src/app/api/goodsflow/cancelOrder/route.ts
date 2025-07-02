import { goodsflowAxios } from "@/api/goodsflow/goodsflowAxios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { transUniqueCd } = await req.json();
  try {
    const { data } = await goodsflowAxios.post(
      `orders/${transUniqueCd}/cancel`
    );
    return NextResponse.json(data);
  } catch (err) {
    console.error("GoodsFlow cancel order error:", err);
    return NextResponse.json(
      { message: "Failed to cancel order" },
      { status: 500 }
    );
  }
}
