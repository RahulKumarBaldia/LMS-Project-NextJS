import { NextResponse } from "next/server";
import { getClearedAuthCookieOptions } from "@/lib/cookies";

export async function POST() {
  const response = NextResponse.json({
    message: "Logout successful",
  });

  response.cookies.set("token", "", getClearedAuthCookieOptions());

  return response;
}
