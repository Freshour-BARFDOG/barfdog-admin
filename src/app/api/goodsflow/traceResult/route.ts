import { goodsflowAxios } from "@/api/goodsflow/goodsflowAxios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await goodsflowAxios.get("orders/traceresults/");
    return NextResponse.json(data);
  } catch (err) {
    console.error("GoodsFlow trace results error:", err);
    return NextResponse.json(
      { message: "Failed to get trace results" },
      { status: 500 }
    );
  }
}
