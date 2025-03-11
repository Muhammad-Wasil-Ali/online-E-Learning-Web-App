import express from "express";
import {
  categoryUpdateController,
  createCategoryController,
  deleteCategoryController,
  getAllCategory,
  getSingleCategory,
} from "../controllers/category.Controller.js";
import { isAuthenticate } from "../middlewares/jwtVerify.js";

const router = express.Router();

router.post("/create-category", isAuthenticate, createCategoryController);
router.get("/get-category/:id", isAuthenticate, getSingleCategory);
router.get("/get-all-category", isAuthenticate, getAllCategory);
router.patch("/update-category/:id", isAuthenticate, categoryUpdateController);
router.delete("/delete-category/:id", isAuthenticate, deleteCategoryController);

export default router;
