import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    videoUrl: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    order: {
      type: Number,
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

lessonSchema.index({ course: 1, slug: 1 }, { unique: true });
lessonSchema.index({ course: 1, order: 1 }, { unique: true });

const Lesson =
  mongoose.models.Lesson ||
  mongoose.model("Lesson", lessonSchema);

export default Lesson;
