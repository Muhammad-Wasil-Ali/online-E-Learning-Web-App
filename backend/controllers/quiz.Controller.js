import { Quiz } from "../models/quiz.Model.js";

// Add a single question to a lesson's quiz
export const addQuizQuestion = async (req, res) => {
  const { lessonId, question, options, correctOptions } = req.body;

  // Input validation
  if (
    !lessonId ||
    !question ||
    !options ||
    options.length < 2 ||
    !Array.isArray(correctOptions)
  ) {
    return res.status(400).json({
      message:
        "Invalid input data. Ensure lessonId, question, and at least 2 options.",
    });
  }

  // Check if a quiz already exists for the given lesson
  let quiz = await Quiz.findOne({ lessonId });

  if (!quiz) {
    // Create a new quiz if none exists
    quiz = new Quiz({
      lessonId,
      questions: [{ question, options, correctOptions }],
    });
  } else {
    // Append the new question to the existing quiz
    quiz.questions.push({ question, options, correctOptions });
  }

  // Save the updated quiz
  try {
    const updatedQuiz = await quiz.save();
    res
      .status(201)
      .json({ message: "Question added successfully", quiz: updatedQuiz });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

//get Single Quiz

// Get a single question from a quiz
export const getSingleQuizController = async (req, res) => {
  const { lessonId, questionId } = req.params;

  try {
    // Find the quiz for the given lesson
    const quiz = await Quiz.findOne({ lessonId });

    if (!quiz) {
      return res
        .status(404)
        .json({ message: "Quiz not found for this lesson" });
    }
    console.log(quiz);
    // Find the specific question
    const question = quiz.questions.find(
      (q) => q._id.toString() === questionId
    );

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ question });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve question", error: error.message });
  }
};

//get all quiz Controller

export const getAllQuizController = async (req, res) => {
  try {
    const { lessonId } = req.params; // Get lessonId from URL

    // Find the quiz using lessonId (not _id)
    const quiz = await Quiz.findOne({ lessonId });

    if (!quiz || quiz.questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions found for this lesson",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Questions retrieved successfully",
      questions: quiz.questions, // Return only the questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve questions",
      error: error.message,
    });
  }
};
