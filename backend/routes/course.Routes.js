import express from "express";
import {
  courseRatingController,
  createCourseController,
  deleteCourseController,
  getAllCourse,
  getCourseRatings,
  getSingleCourse,
  publishCourseController,
  unPublishCourseController,
  updateCourseController,
} from "../controllers/course.Controller.js";
import { isAuthenticate } from "../middlewares/jwtVerify.js";
import { uploadImage } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/create-course",
  uploadImage.single("file"),
  isAuthenticate,
  createCourseController
);

router.get("/get-single-course/:id", isAuthenticate, getSingleCourse);

router.get("/get-all-course", getAllCourse);

router.patch(
  "/update-course/:id",
  uploadImage.single("file"),
  isAuthenticate,
  updateCourseController
);

router.delete("/delete-course/:id", isAuthenticate, deleteCourseController);
router.patch("/publish-course/:id", isAuthenticate, publishCourseController);
router.patch(
  "/unpublish-course/:id",
  isAuthenticate,
  unPublishCourseController
);

router.patch("/ratings/:id", isAuthenticate, courseRatingController);

router.get("/get-ratings/:id", isAuthenticate, getCourseRatings);

export default router;
