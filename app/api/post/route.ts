import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const httpHeaders = headers();
  console.info("httpHeaders: ", httpHeaders.get("x-something"));
  console.info("request.headers: ", request.headers.get("x-something"));
  return NextResponse.json({ message: "/api/post" });
}
