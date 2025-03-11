import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { processVideo } from "../utils/videoProcessing/ffmpeg.js";
import { Lesson } from "../models/lesson.Model.js";
export const createLessonController = async (req, res) => {
  try {
    const { title, duration } = req.body;
    const courseId = req.params.id;
    const inputPath = req.file.path;
    const videoId = uuidv4();
    const ouputPath = path.join("videos", videoId);

    if (!fs.existsSync(ouputPath)) {
      fs.mkdirSync(ouputPath, { recursive: true });
    }
    const hlsPath = await processVideo(inputPath, ouputPath);
    fs.unlinkSync(inputPath);
    console.log(hlsPath.replace(/\\/g, "/"));
    const videoUrl = `http://localhost:8000/${hlsPath.replace(/\\/g, "/")}`;

    const lesson = await Lesson.create({
      title,
      duration,
      courseId,
      videoUrl,
    });
    res.status(200).send({
      success: true,
      message: "Lesson Created Succssfully",
      lesson,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// get single lesson

export const getLessonByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(400).send({
        success: false,
        message: "Lesson Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Lesson Get Successfully",
      lesson,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//get All Lesson

export const getAllLessonController = async (req, res) => {
  try {
    const lesson = await Lesson.find();
    if (lesson.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Lesson Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All Lesson Get Successfully",
      lesson,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//update Lesson Controller

export const updateLessonController = async (req, res) => {
  try {
    const { id } = req.params;
    const inputPath = req.file?.path;

    let videoUrl;

    if (inputPath) {
      // Find existing lesson
      const existLesson = await Lesson.findById(id);
      if (!existLesson) {
        return res
          .status(404)
          .send({ success: false, message: "Lesson not found" });
      }

      const oldUrl = existLesson.videoUrl;
      if (oldUrl) {
        // Extract the relative path
        const urlPath = path.join(
          "videos",
          oldUrl.split("/videos/")[1].split("/index.m3u8")[0]
        );

        // Ensure the folder exists before deleting
        if (fs.existsSync(urlPath)) {
          fs.rmSync(urlPath, { recursive: true, force: true });
        }
      }

      // Generate new video ID and create folder
      const videoId = uuidv4();
      const outputPath = path.join("videos", videoId);
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }

      // Process video
      const hlsPath = await processVideo(inputPath, outputPath);
      fs.unlinkSync(inputPath); // Delete the uploaded file after processing
      videoUrl = `http://localhost:8000/${hlsPath.replace(/\\/g, "/")}`;
    }

    // Update the lesson
    const updatedLesson = await Lesson.findByIdAndUpdate(
      id,
      { ...req.body, ...(videoUrl ? { videoUrl } : {}) },
      { new: true }
    );

    if (!updatedLesson) {
      return res.status(400).send({
        success: false,
        message: "Lesson Not Updated",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Lesson Updated Successfully",
      updatedLesson,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//delete lesson Controller

export const deleteLessonController = async (req, res) => {
  try {
    const { id } = req.params;

    const del = await Lesson.findByIdAndDelete(id);
    if (!del) {
      return res.status(400).send({
        success: false,
        message: "Lesson Not Deleted",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Lesson Deleted Successfully",
      del,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


//