import { enrollUserController } from "@/controllers/enrollmentController";
import { isAuthenticated } from "@/middleware/authMiddleware";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const auth = await isAuthenticated(request);

        if (!auth.authenticated) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { courseId } = await request.json();

        if (!courseId) {
            return NextResponse.json(
                { message: "Course ID is required" },
                { status: 400 }
            );
        }

        const enrollment = await enrollUserController(
            auth.user.id,
            courseId
        );

        return NextResponse.json(
            {
                message: "Enrollment successful",
                enrollment,
            },
            { status: 201 }
        );
    } catch (error) {
        if (error.message === "Enrollment already exists") {
            return NextResponse.json(
                { message: error.message },
                { status: 409 }
            );
        }

        console.error("Enrollment error:", error);

        return NextResponse.json(
            { message: "Failed to create enrollment" },
            { status: 500 }
        );
    }
}