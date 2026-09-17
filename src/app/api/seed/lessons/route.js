import { NextResponse } from "next/server";
import seedLessons from "@/scripts/seedLessons";
import { assertSeedAllowed } from "@/lib/env";
import { publicErrorPayload } from "@/lib/apiError";

export async function GET() {
  try {
    assertSeedAllowed();
    const result = await seedLessons();

    return NextResponse.json(
      {
        message: "Lessons seeded successfully",
        ...result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      publicErrorPayload("Lesson seeding failed", error),
      { status: error.status || 500 }
    );
  }
}
