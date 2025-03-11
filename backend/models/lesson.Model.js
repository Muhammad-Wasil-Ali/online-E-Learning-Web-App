import mongoose from "mongoose";

const lessonSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    resources: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export const Lesson = mongoose.model("Lesson", lessonSchema);
