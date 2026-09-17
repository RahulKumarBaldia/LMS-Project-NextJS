import { recordProgress, getProgress } from "@/services/progressService";
import { publicErrorPayload } from "@/lib/apiError";

export const recordProgressController = async (
  user,
  course,
  completedLessons
) => {
  try {
    const progress = await recordProgress(user, course, completedLessons);
    return Response.json(progress, { status: 200 });
  } catch (error) {
    return Response.json(
      publicErrorPayload("Failed to record progress", error),
      { status: 500 }
    );
  }
};

export const getProgressController = async (user, course) => {
  try {
    const progress = await getProgress(user, course);
    return Response.json(progress, { status: 200 });
  } catch (error) {
    return Response.json(
      publicErrorPayload("Failed to get progress", error),
      { status: 500 }
    );
  }
};
