import { NextResponse } from "next/server";

import connectToDb from "@/lib/db";
import { getAuthTokenCookieOptions } from "@/lib/cookies";
import { loginUser } from "@/services/authService";
import { validateLogin } from "@/validators/authValidator";

export async function POST(request) {
  try {
    const body = await request.json();

    const validationError = validateLogin(body);

    if (validationError) {
      return NextResponse.json(
        { message: validationError },
        { status: 400 }
      );
    }

    await connectToDb();

    const result = await loginUser({
      email: body.email,
      password: body.password,
    });

    const response = NextResponse.json({
      message: "Login successful",
      user: result.user,
    });

    response.cookies.set(
      "token",
      result.token,
      getAuthTokenCookieOptions()
    );

    return response;
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return NextResponse.json(
        { message: error.message },
        { status: 401 }
      );
    }

    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}
