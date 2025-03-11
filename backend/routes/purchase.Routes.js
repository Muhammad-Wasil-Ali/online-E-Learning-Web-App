import express from "express";
import { stripeSessionController } from "../controllers/purchase.Controller.js";
import { isAuthenticate } from "../middlewares/jwtVerify.js";

const router = express.Router();

router.post("/payment", isAuthenticate, stripeSessionController);
export default router;
