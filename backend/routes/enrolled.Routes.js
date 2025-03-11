import express from "express";
import {
  createCustomer,
  createEnrolledStudents,
} from "../controllers/enrolled.Controller.js";
import { isAuthenticate } from "../middlewares/jwtVerify.js";

const router = express.Router();

router.post("/customer", createCustomer);
router.post("/enrolled/:id", isAuthenticate, createEnrolledStudents);
export default router;
