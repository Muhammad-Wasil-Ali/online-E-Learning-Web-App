import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: {
        type: [String],
        required: true,
      },
      correctOptions: {
        type: [Number], // Array of indices for correct options
        required: true,
        default: [],
      },
    },
  ],
});

export const Quiz = mongoose.model("Quiz", quizSchema);
