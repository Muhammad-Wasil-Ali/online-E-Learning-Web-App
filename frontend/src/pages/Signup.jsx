import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Lock,
  User,
  Phone,
  UploadCloud,
  Eye,
  EyeOff,
  UserCircle,
  Loader2,
} from "lucide-react";
import signupIllustration from "../assets/signupimage.svg"; // Replace with your own image
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isSuccessFalse, signUp } from "@/store/userSlice";
import { toast } from "sonner";

export default function Signup() {
  //useDispatch Hook

  const dispatch = useDispatch();

  //useSelector Hook

  const user = useSelector((state) => state.user);

  //navigate hook
  const navigate = useNavigate();
  console.log(user);

  const [input, setInput] = useState([
    {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "",
    },
  ]);

  const onHandleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const fileInputRef = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputFile, setInputFile] = useState(null);

  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setInputFile(file);
    }
  };

  //onHandleSignUp
  const onHandleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phone", input.phone);
    formData.append("role", input.role);
    formData.append("file", inputFile);
    dispatch(signUp(formData));
  };

  useEffect(() => {
    if (user.isSuccess === true) {
      toast("SignUp Successful", {
        description: "Please Verify Your Email",
        className: "animate-bounce",
        duration: 2500,
      });
      setTimeout(() => {
        navigate("/emailverification");
      }, 2500);
    }

    dispatch(isSuccessFalse());
  }, [user.isSuccess, navigate]);

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Illustration Side */}
        <div className="flex items-center justify-center p-6">
          <img
            src={signupIllustration}
            alt="Sign Up Illustration"
            className="w-full max-w-md"
          />
        </div>

        {/* Form Side */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-[#1E1E1E] mb-2">
            Create Account
          </h2>
          <p className="text-[#6B7280] text-sm mb-6">
            Join us and start your journey!
          </p>

          <form className="space-y-5" onSubmit={onHandleSignUp}>
            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-[#4A90E2]" />
              <input
                type="text"
                placeholder="Full Name"
                className="pl-10 w-full p-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#4A90E2]"
                name="name"
                onChange={onHandleChange}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-[#4A90E2]" />
              <input
                type="email"
                placeholder="Email Address"
                className="pl-10 w-full p-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#4A90E2]"
                name="email"
                onChange={onHandleChange}
              />
            </div>

            {/* Password with Show/Hide */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-[#4A90E2]" />
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="pl-10 pr-10 w-full p-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#4A90E2]"
                name="password"
                onChange={onHandleChange}
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-[#4A90E2]"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <EyeOff /> : <Eye />}
              </span>
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-[#4A90E2]" />
              <input
                type="tel"
                placeholder="Phone Number"
                className="pl-10 w-full p-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#4A90E2]"
                name="phone"
                onChange={onHandleChange}
              />
            </div>

            {/* Role */}
            <div className="relative">
              <UserCircle className="absolute left-3 top-3 text-[#4A90E2]" />
              <select
                className="pl-10 w-full p-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#4A90E2]"
                name="role"
                onChange={onHandleChange}
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            {/* Profile Picture Upload */}
            <div
              className="border-2 border-dashed border-[#4A90E2] rounded-lg p-5 text-center cursor-pointer bg-[#f9fbfd] hover:bg-[#eaf2fb]"
              onClick={handleImageClick}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="mx-auto h-40 object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <UploadCloud className="w-8 h-8 text-[#4A90E2]" />
                  <p className="text-sm text-[#4A90E2]">
                    Click or Drag to upload profile picture
                  </p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
            </div>

            {/* Submit */}
            {user?.isLoading ? (
              <button
                type="submit"
                className="flex justify-center items-center gap-3 w-full bg-[#4A90E2] hover:bg-[#357ABD] text-white py-3 rounded-lg shadow transition-all duration-300"
              >
                <Loader2 className="w-5 h-5 animate-spin " /> Signing Up...
              </button>
            ) : (
              <button
                type="submit"
                className="flex justify-center items-center gap-3 w-full bg-[#4A90E2] hover:bg-[#357ABD] text-white py-3 rounded-lg shadow transition-all duration-300"
              >
                Sign Up
              </button>
            )}
          </form>

          {/* Login link */}
          <p className="text-[#6B7280] text-sm mt-6 text-center">
            Already have an account?
            <Link to="/login" className="text-[#4A90E2] hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
