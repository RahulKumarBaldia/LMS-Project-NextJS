import connectToDb from "@/lib/db";
import Progress from "@/models/Progress";
import Lesson from "@/models/Lesson";

export const recordProgress = async (user, course, completedLessons) => {
  await connectToDb();

  const progress = await Progress.findOne({ user, course });

  if (progress) {
    const newLessons = completedLessons.filter(
      (lesson) =>
        !progress.completedLessons.some(
          (completedLesson) =>
            completedLesson.toString() === lesson._id.toString()
        )
    );

    progress.completedLessons.push(
      ...newLessons.map((lesson) => lesson._id)
    );

    await progress.save();

    return progress;
  }

  const newProgress = await Progress.create({
    user,
    course,
    completedLessons: completedLessons.map((lesson) => lesson._id),
  });

  return newProgress;
};

export const getProgress = async (user, course) => {
  await connectToDb();

  const progress = await Progress.findOne({ user, course });
  const lessons = await Lesson.find({ course });

  const totalLessons = lessons.length;
  const completedLessons = progress?.completedLessons || [];

  const progressPercentage =
    totalLessons > 0
      ? (completedLessons.length / totalLessons) * 100
      : 0;

  return {
    progressPercentage,
    completedLessons,
    totalLessons,
  };
};