import express from "express";
import {
  userLoginController,
  userLogoutController,
  userRegisterController,
  userUpdateController,
  verifyEmail,
} from "../controllers/user.Controller.js";
import { isAuthenticate } from "../middlewares/jwtVerify.js";

const router = express.Router();

router.post("/register", userRegisterController);
router.post("/verify-email", verifyEmail);
router.post("/login", userLoginController);
router.patch("/update", isAuthenticate, userUpdateController);
router.get("/logout", isAuthenticate, userLogoutController);

export default router;
