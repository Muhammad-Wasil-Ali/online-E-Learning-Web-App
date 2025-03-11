import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Name must be at least 3 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    phone: {
      type: String,
      required: true,
      match: [/^\+?\d{10,15}$/, "Please enter a valid phone number"],
    },
    profile: {
      profilePhoto: {
        type: String,
      },
      bio: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["student", "instructor"],
    },
    verificationCode: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    enrolledCourse: {
      type: [],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
