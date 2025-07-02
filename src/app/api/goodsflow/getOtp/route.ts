import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { data } = await goodsflowAxios.post(
      `otps/partner/${process.env.NEXT_PUBLIC_GOODSFLOW_PARTNERCODE}`
    );
    return NextResponse.json(data);
  } catch (err) {
    console.error("GoodsFlow OTP error:", err);
    return NextResponse.json({ message: "Failed to get OTP" }, { status: 500 });
  }
}
