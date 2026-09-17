import {
  getAllCoursesController,
  createCourseController,
} from "@/controllers/courseController";

import { adminOnly } from "@/middleware/roleMiddleware";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const difficulty = searchParams.get("difficulty") || "";

  return await getAllCoursesController({
    search,
    category,
    difficulty,
  });
}

export async function POST(request) {
  const result = await adminOnly(request);

  if (result instanceof Response) {
    return result;
  }

  return await createCourseController(request, result);
}