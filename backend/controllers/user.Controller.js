import { User } from "../models/user.Model.js";
import { comparePassword, hashPassword } from "../utils/bcrypt/bcrypt.js";
import { sendEmail } from "../utils/emailVerification/email.Verify.js";
import jwt from "jsonwebtoken";
//user Register

export const userRegisterController = async (req, res) => {
  try {
    //getting data from frontend
    const { name, email, password, phone, role } = req.body;

    //getting file
    const file = req.file;

    if (!name || !email || !password || !phone || !role) {
      return res.status(400).send({
        success: false,
        message: "All fileds are required",
      });
    }
    // if (!file) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Profile Photo is Required",
    //   });
    // }
    //checking user is already exists or not
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).send({
        success: false,
        message: "User Already Exists, Please Login",
      });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 100000
    ).toString();

    //Creating User
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      verificationCode,
    });
    const subject = `Hello ${name}`;
    const emailMessage = `Your Email Verification Code is ${verificationCode}`;
    await sendEmail(email, subject, emailMessage);

    res.status(200).send({
      success: true,
      message: "Registration Successful! Please  Verify Your Email",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

//==========Email Verification
export const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    console.log(email, code);
    if (!email || !code) {
      return res.status(400).send({
        success: false,
        message: "Both fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide valid email",
      });
    }
    if (user.verificationCode !== code) {
      return res.status(400).send({
        success: false,
        message: "Invalid Verification Code",
      });
    }

    user.isVerified = true;
    user.verificationCode = null;
    console.log(user);
    await user.save();

    return res.status(200).send({
      success: true,
      message: "Email Verified Successfully",
    });
  } catch (error) {
    return res.status(200).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// user Login

export const userLoginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    //======Checking User Exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid username or password",
      });
    }
    if (user.isVerified === false || user.verificationCode !== null) {
      return res.status(400).send({
        success: false,
        message: "You're email is not verified",
      });
    }
    //=======Checking User Password is matching or not
    const comparedPassword = await comparePassword(password, user.password);
    if (!comparedPassword) {
      return res.status(400).send({
        success: false,
        message: "Invalid username or password",
      });
    }

    //Checking User Role

    if (role != user.role) {
      return res.status(400).send({
        success: false,
        message: "Invalid Role",
      });
    }
    //Generating Token

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    // storing token in cookie

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .send({
        success: true,
        messae: "Login Sucessfull",
        user,
      });
  } catch (error) {
    return res.status(500).send({
      success: false,
      messae: "Internal Server Error",
      error,
    });
  }
};

//=========Update User

export const userUpdateController = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(id);
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      messae: "User Updated Successfully",
      updateUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      messae: "Internal Server Error",
      error,
    });
  }
};

//======== Logout Controller

export const userLogoutController = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });
    return res.status(200).send({
      success: true,
      message: "Logout Successful",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      messae: "Internal Server Error",
      error,
    });
  }
};
