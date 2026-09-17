import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    instructor: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    lessons: [
      {
        title: {
          type: String,
          required: true,
        },

        duration: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Course =
  mongoose.models.Course ||
  mongoose.model("Course", courseSchema);

export default Course;
