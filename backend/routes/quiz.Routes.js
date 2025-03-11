import express from "express";
import {
  addQuizQuestion,
  getAllQuizController,
  getSingleQuizController,
} from "../controllers/quiz.Controller.js";
import { isAuthenticate } from "../middlewares/jwtVerify.js";

const router = express.Router();

router.post("/create-quiz", isAuthenticate, addQuizQuestion);
router.get(
  "/get-single-quiz/:lessonId/:questionId",
  isAuthenticate,
  getSingleQuizController
);

router.get("/get-all-quiz/:lessonId", isAuthenticate, getAllQuizController);

export default router;
