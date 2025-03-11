import { Course } from "../models/course.Model.js";
import { Enrolled } from "../models/enrollement.Model.js";

import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCustomer = async (req, res) => {
  try {
    const obj1 = {
      name: "abc@gmail.com",
      description: "abcdefgh",
    };
    const customer = await stripe.customers.create(obj1, (err, customer) => {
      if (err) {
        return res.status(400).send({
          success: false,
          message: "Error while creating cusomer",
          err: err.message,
        });
      }
      if (customer) {
        return res.status(200).send({
          success: true,
          message: "Customer created successfully",
          customer,
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const createEnrolledStudents = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).send({
        success: false,
        message: "Course Not Found",
      });
    }
    const alreadyEnrolled = await Enrolled.findOne({ userId, courseId });
    if (alreadyEnrolled) {
      return res.status(400).send({
        success: false,
        message: "You are already enrolled in this course",
      });
    }
    const enrolled = await Enrolled.create({
      courseId,
      userId,
    });

    course.enrolled.push(userId);
    await course.save();
    return res.status(200).send({
      success: true,
      message: "Enrolled Successfully",
      enrolled,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
