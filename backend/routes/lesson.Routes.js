import express from "express";
import {
  createLessonController,
  deleteLessonController,
  getAllLessonController,
  getLessonByIdController,
  updateLessonController,
} from "../controllers/lesson.Controller.js";
import { isAuthenticate } from "../middlewares/jwtVerify.js";
import { uploadVideo } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/create-lesson/:id",
  isAuthenticate,
  uploadVideo.single("video"),
  createLessonController
);

router.get("/get-single/:id", getLessonByIdController);
router.get("/get-all", getAllLessonController);
router.patch(
  "/update-lesson/:id",
  isAuthenticate,
  uploadVideo.single("video"),
  updateLessonController
);

router.delete("/delete-lesson/:id", isAuthenticate, deleteLessonController);

export default router;
