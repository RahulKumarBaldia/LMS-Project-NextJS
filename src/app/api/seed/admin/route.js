import { NextResponse } from "next/server";
import seedAdmin from "@/scripts/seedAdmin";
import { assertSeedAllowed } from "@/lib/env";
import { publicErrorPayload } from "@/lib/apiError";

export async function GET() {
  try {
    assertSeedAllowed();
    const result = await seedAdmin();

    return NextResponse.json(
      {
        message: result.created
          ? "Admin created successfully"
          : "Existing user promoted to admin",
        ...result,
        hint: "Log in at /auth with the admin email and password, then open /admin",
      },
      { status: result.created ? 201 : 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      publicErrorPayload("Admin seeding failed", error),
      { status: error.status || 500 }
    );
  }
}
