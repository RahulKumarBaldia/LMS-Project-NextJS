import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import connectToDb from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const decoded = verifyToken(token);

    await connectToDb();

    const user = await User.findById(decoded.userId)
      .select("-password");

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}