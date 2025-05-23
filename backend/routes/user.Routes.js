import express from "express";
import {
  userLoginController,
  userLogoutController,
  userRegisterController,
  userUpdateController,
  verifyEmail,
} from "../controllers/user.Controller.js";
import { isAuthenticate } from "../middlewares/jwtVerify.js";
import { uploadImage } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", uploadImage.single("file"), userRegisterController);
router.post("/verify-email", verifyEmail);
router.post("/login", userLoginController);
router.patch("/update", isAuthenticate, userUpdateController);
router.get("/logout", userLogoutController);

export default router;
