import { Category } from "../models/category.Model.js";
import { Course } from "../models/course.Model.js";
import { User } from "../models/user.Model.js";
import cloudinary from "../utils/cloudinary/cloudinary.js";

// create course controller

export const createCourseController = async (req, res) => {
  try {
    //instructor idd
    const { id } = req.user;
    const { title, description, category, level, price, duration } = req.body;

    const file = req.file;

    if (!title || !description || !category || !level || !price || !duration) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    if (isNaN(duration) || duration <= 0) {
      return res.status(400).send({
        success: false,
        message: "Duration must be a valid number greater than 0",
      });
    }
    if (isNaN(price) || price <= 0) {
      return res.status(400).send({
        success: false,
        message: "Price must be a valid number greater than 0",
      });
    }
    if (!file) {
      return res.status(400).send({
        success: false,
        message: "Thumbnail is required",
      });
    }
    const categoryExist = await Category.findById(category);

    if (!categoryExist) {
      return res.status(400).send({
        success: false,
        message: "Category Not Exists",
      });
    }

    const instructorExist = await User.findById(id);
    if (!instructorExist) {
      return res.status(400).send({
        success: false,
        message: "Instructor Not Exists",
      });
    }
    //cloudinary setup
    const cloudResponse = await cloudinary.uploader.upload(file.path, {
      folder: "courses/thumbnails",
      resource_type: "image",
    });

    const course = await Course.create({
      title,
      description,
      level,
      category,
      instructor: id,
      price,
      duration,
      thumbnail: cloudResponse.secure_url,
    });

    return res.status(200).send({
      success: true,
      message: "Course Created Successfully",
      course,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

//get Single Course

export const getSingleCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const getSingleCourse = await Course.findById(id)
      .populate({
        path: "category",
      })
      .populate({
        path: "instructor",
      });

    if (!getSingleCourse) {
      return res.status(404).send({
        success: false,
        message: "Course Not Found",
        error,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Single Course Get Successfully",
      getSingleCourse,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//get All Course

export const getAllCourse = async (req, res) => {
  try {
    const getAllCourse = await Course.find();

    if (!getAllCourse || getAllCourse.length === 0) {
      return res.status(500).send({
        success: false,
        message: "No Course Uploaded",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Get All Course Successfully",
      getAllCourse,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//update Course Controller

export const updateCourseController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Object.keys(req.body).length && !req.file) {
      return res.status(400).send({
        success: false,
        message: "At least one field is required for update",
      });
    }

    const file = req.file;
    let updatedData = { ...req.body };
    if (file) {
      const existingCourse = await Course.findById(id);
      console.log(existingCourse.thumbnail);
      const publicId = existingCourse.thumbnail.split("/").pop().split(".")[0];
      console.log(publicId);
      const result = await cloudinary.uploader.destroy(
        `courses/thumbnails/${publicId}`
      );
      console.log(result);

      const cloudResponse = await cloudinary.uploader.upload(file.path, {
        folder: "courses/thumbnails",
        resource_type: "image",
      });
      updatedData.thumbnail = cloudResponse.secure_url;
    }
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(400).send({
        success: false,
        message: "Course Not Updated",
        error: error.message,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Course Updated Successfully",
      updatedCourse,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//delete Course Controller

export const deleteCourseController = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteCourse = await Course.findByIdAndDelete(id);
    if (!deleteCourse) {
      return res.status(400).send({
        success: false,
        message: "Course Not Deleted",
        error: error.message,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Course Deleted Successfully",
      deleteCourse,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//update status controller

//publish Course

export const publishCourseController = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(400).send({
        success: false,
        message: "Course Not Found",
      });
    }

    if (course.lessonCount < 1) {
      return res.status(400).send({
        success: false,
        message: "You must upload at least one lesson for publish",
      });
    }
    const updateStatus = await Course.findByIdAndUpdate(
      id,
      { status: "published" },
      { new: true }
    );

    if (!updateStatus) {
      return res.status(400).send({
        success: false,
        message: "Course Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Course Published Successfully",
      course: updateStatus,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// course unpublished controller

export const unPublishCourseController = async (req, res) => {
  try {
    const { id } = req.params;

    const updateStatus = await Course.findByIdAndUpdate(
      id,
      { status: "unpublished" },
      { new: true }
    );
    if (!updateStatus) {
      return res.status(400).send({
        success: false,
        message: "Course Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Course Published Successfully",
      course: updateStatus,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//Course Ratings Controller

export const courseRatingController = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;
    if (rating < 0 || rating > 5) {
      return res.status(400).send({
        success: false,
        message: "Rating must be from 0 to 5",
      });
    }
    const course = await Course.findById(id);
    if (!course) {
      return res.status(400).send({
        success: false,
        message: "Course Not Found",
      });
    }

    const existingRating = course.ratings.find(
      (rate) => rate.user.toString() === userId
    );
    if (existingRating) {
      return res.status(400).send({
        success: false,
        message: "You have already reviewed this course",
      });
    } else {
      course.ratings.push({ user: userId, rating, comment });
    }
    const totalRatings = course.ratings.length;

    const sumRating = course.ratings.reduce(
      (sum, rate) => (sum += rate.rating),
      0
    );

    const avgRating =
      totalRatings > 0 ? (sumRating / totalRatings).toFixed(1) : 0;
    const userRating = course.ratings.find(
      (rate) => rate.user.toString() === userId
    );
    (course.avgRatings = avgRating), await course.save();
    return res.status(200).send({
      success: true,
      message: "Average Rating Get Successfully",
      userRating,
      avgRating,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//get Courses Ratings and

export const getCourseRatings = async (req, res) => {
  try {
    const { id } = req.params;
    const courseRatings = await Course.findById(id)
      .select("ratings")
      .populate("ratings.user", "name");

    if (!courseRatings) {
      return res.status(400).send({
        success: false,
        message: "Course Rating Not Found!",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Course Ratings Get Successfully",
      courseRatings,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
