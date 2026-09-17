import {
    getLessonsController,
    createLessonController,
  } from "@/controllers/lessonController";
  
  import { adminOnly } from "@/middleware/roleMiddleware";
  
  export async function GET(request, { params }) {
    const { courseSlug } = await params;
  
    return await getLessonsController(courseSlug);
  }
  
  export async function POST(request, { params }) {
    const { courseSlug } = await params;
  
    const result = await adminOnly(request);
  
    if (result instanceof Response) {
      return result;
    }
  
    return await createLessonController(request, courseSlug);
  }