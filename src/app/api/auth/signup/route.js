import { NextResponse } from "next/server";

import connectToDb from "@/lib/db";
import { getAuthTokenCookieOptions } from "@/lib/cookies";
import { signupUser } from "@/services/authService";
import { validateSignup } from "@/validators/authValidator";

export async function POST(request) {
  try {
    const body = await request.json();

    const validationError = validateSignup(body);

    if (validationError) {
      return NextResponse.json(
        { message: validationError },
        { status: 400 }
      );
    }

    await connectToDb();

    const result = await signupUser({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    const response = NextResponse.json(
      {
        message: "Signup successful",
        user: result.user,
      },
      { status: 201 }
    );

    response.cookies.set(
      "token",
      result.token,
      getAuthTokenCookieOptions()
    );

    return response;
  } catch (error) {
    if (error.message === "User already exists") {
      return NextResponse.json(
        { message: error.message },
        { status: 409 }
      );
    }

    console.error("Signup error:", error);

    return NextResponse.json(
      { message: "Signup failed" },
      { status: 500 }
    );
  }
}
