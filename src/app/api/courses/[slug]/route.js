import {
    getCourseBySlugController,
    updateCourseController,
    deleteCourseController,
  } from "@/controllers/courseController";
  
  import { adminOnly } from "@/middleware/roleMiddleware";
  
  export async function GET(request, { params }) {
    const { slug } = await params;
  
    return await getCourseBySlugController(slug);
  }
  
  export async function PATCH(request, { params }) {
    const { slug } = await params;
  
    const result = await adminOnly(request);
  
    if (result instanceof Response) {
      return result;
    }
  
    return await updateCourseController(request, slug);
  }
  
  export async function DELETE(request, { params }) {
    const { slug } = await params;
  
    const result = await adminOnly(request);
  
    if (result instanceof Response) {
      return result;
    }
  
    return await deleteCourseController(slug);
  }