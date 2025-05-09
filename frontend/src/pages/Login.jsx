import { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff, Users, Loader2 } from "lucide-react";
import loginIllustration from "../assets/login.svg"; // Add your image
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isSuccessFalse, login } from "@/store/userSlice";
import { toast } from "sonner";

export default function Login() {
  //dispatch hook
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);

  //onHandleLogin

  const onHandleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, role }));
  };

  useEffect(() => {
    if (user.isSuccess) {
      toast("Login Succesful", {
        duration: 2500,
      });
      setTimeout(() => {
        navigate("/");
      }, 2500);
    }
    if (user.isError) {
      toast("Login Failed", {
        duration: 2500,
      });
    }
    if (user.isSuccess || user.isError) {
      setTimeout(() => {
        dispatch(isSuccessFalse()); // Reset after toast and navigation
      }, 2500); // Wait for toast duration before resetting state
    }
    dispatch(isSuccessFalse());
  }, [user.isError, user.isSuccess, navigate, isSuccessFalse]);

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Illustration Side */}
        <div className="flex items-center justify-center p-6">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="w-full max-w-md"
          />
        </div>

        {/* Form Side */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-[#1E1E1E] mb-2">Login</h2>
          <p className="text-[#6B7280] text-sm mb-6">Login to continue</p>

          <form className="space-y-5" onSubmit={onHandleLogin}>
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-[#4A90E2]" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full p-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#4A90E2]"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-[#4A90E2]" />
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 w-full p-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#4A90E2]"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-[#4A90E2]"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <EyeOff /> : <Eye />}
              </span>
            </div>
            {/* Role */}
            <div className="relative w-full max-w-full">
              <Users className="absolute left-3 top-3 text-[#4A90E2]" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="pl-10 pr-4 w-full p-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#4A90E2] bg-white text-[#1E1E1E]"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            {/* Submit */}

            {user.isSuccess ? (
              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full bg-[#4A90E2] hover:bg-[#357ABD] text-white py-3 rounded-lg shadow transition-all duration-300"
              >
                <Loader2 className="animate-spin h-5 w-5" />
                Login
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#4A90E2] hover:bg-[#357ABD] text-white py-3 rounded-lg shadow transition-all duration-300"
              >
                Login
              </button>
            )}
          </form>

          {/* Signup link */}
          <p className="text-[#6B7280] text-sm mt-6 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#4A90E2] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
