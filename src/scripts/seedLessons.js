import connectToDb from "@/lib/db";
import Lesson from "@/models/Lesson";
import Course from "@/models/Course";
import lessons, { COURSE_IDS } from "@/data/lessons";

export default async function seedLessons() {
  await connectToDb();

  const idToSlug = Object.fromEntries(
    Object.entries(COURSE_IDS).map(([slug, id]) => [id, slug])
  );

  const courses = await Course.find({}).select("_id slug");
  const slugToId = Object.fromEntries(
    courses.map((course) => [course.slug, course._id])
  );

  const ops = [];

  for (const lesson of lessons) {
    const slug = idToSlug[lesson.course];
    const courseId = slugToId[slug];

    if (!courseId) {
      continue;
    }

    const { course: _legacy, ...rest } = lesson;

    ops.push({
      updateOne: {
        filter: { course: courseId, slug: lesson.slug },
        update: { $set: { ...rest, course: courseId } },
        upsert: true,
      },
    });
  }

  if (ops.length === 0) {
    throw new Error("No courses found to attach lessons. Seed courses first.");
  }

  const result = await Lesson.bulkWrite(ops);

  return {
    total: ops.length,
    matched: result.matchedCount,
    modified: result.modifiedCount,
    upserted: result.upsertedCount,
  };
}
