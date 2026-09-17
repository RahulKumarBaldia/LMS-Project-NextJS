import {
    getLessonBySlugsController,
    updateLessonController,
    deleteLessonController,
} from "@/controllers/lessonController";

import { adminOnly } from "@/middleware/roleMiddleware";

export async function GET(request, { params }) {
    const { courseSlug, lessonSlug } = await params;

    return await getLessonBySlugsController(
        courseSlug,
        lessonSlug
    );
}

export async function PATCH(request, { params }) {
    const { courseSlug, lessonSlug } = await params;

    const result = await adminOnly(request);

    if (result instanceof Response) {
        return result;
    }

    return await updateLessonController(
        request,
        courseSlug,
        lessonSlug
    );
}

export async function DELETE(request, { params }) {
    const { courseSlug, lessonSlug } = await params;

    const result = await adminOnly(request);

    if (result instanceof Response) {
        return result;
    }

    return await deleteLessonController(
        courseSlug,
        lessonSlug
    );
}