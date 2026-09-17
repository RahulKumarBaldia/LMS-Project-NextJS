import mongoose from "mongoose";
import "@/models/Course";
import "@/models/User";

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
  },
  { timestamps: true }
);

progressSchema.index({ user: 1, course: 1 }, { unique: true });

const Progress =
  mongoose.models.Progress ||
  mongoose.model("Progress", progressSchema);

export default Progress;