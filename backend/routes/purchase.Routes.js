import express from "express";
import { stripeSessionController, stripeWebHook } from "../controllers/purchase.Controller.js";
import { isAuthenticate } from "../middlewares/jwtVerify.js";

const router = express.Router();

router.post("/payment", isAuthenticate, stripeSessionController);

router.post('/stripe',stripeWebHook)
export default router;
