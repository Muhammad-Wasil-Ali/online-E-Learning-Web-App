import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGO_URL}/LearningApp`
    );

    console.log(`📦 MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(` Error while Connecting Database: ${error.message}`);
  }
};
