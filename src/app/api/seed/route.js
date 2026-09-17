import { NextResponse } from "next/server";
import connectToDb from "@/lib/db";
import Course from "@/models/Course";
import mockCourses from "@/data/courses";
import { assertSeedAllowed } from "@/lib/env";
import { publicErrorPayload } from "@/lib/apiError";

export async function GET() {
  try {
    assertSeedAllowed();
    await connectToDb();

    await Course.deleteMany({});
    const courses = await Course.insertMany(mockCourses);

    return NextResponse.json(
      {
        message: "Courses seeded successfully",
        count: courses.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(publicErrorPayload("Seeding failed", error), {
      status: error.status || 500,
    });
  }
}
