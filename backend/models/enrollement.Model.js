import mongoose from "mongoose";

const enrolledSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancel"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Enrolled = mongoose.model("Enroll", enrolledSchema);
