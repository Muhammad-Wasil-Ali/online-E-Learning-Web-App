import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.Config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
//importing ===User Routes====
import userRoutes from "./routes/user.Routes.js";
//importing ===Category Routes====
import categoryRoutes from "./routes/category.Routes.js";

// importing ====Course Routes====
import courseRoutes from "./routes/course.Routes.js";

//importing ====Lesson Routes=====
import lessonRoutes from "./routes/lesson.Routes.js";

//importing =====Enrolled Routes=======

import enrolledRoutes from "./routes/enrolled.Routes.js";

//importing ========Quiz Routes================

import quizRoutes from "./routes/quiz.Routes.js";

//importing ========Purchase Routes===========

import purchaseRoutes from "./routes/purchase.Routes.js";

// dotenv config
dotenv.config();
// initializing app
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/lesson", lessonRoutes);
app.use("/api/v1/enroll", enrolledRoutes);
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/purchase", purchaseRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on Port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(`Error while Connecting MongoDB Server.js ${e}`);
  });
