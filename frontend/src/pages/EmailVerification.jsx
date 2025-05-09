import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { emailVerify } from "@/store/userSlice";
import { toast } from "sonner";

export default function EmailVerification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    dispatch(
      emailVerify({
        email: user?.user?.user.email,
        verificationCode: otp.join(""),
      })
    );
  };

  useEffect(() => {
    if (user?.isSuccess) {
      toast("Email Verified", {
        duration: 2500,
        description: "Login and find kick",
      });
      setTimeout(() => navigate("/login"), 2500);
    }

    if (user?.isError !== false) {
      toast("Email Verification Failed", {
        duration: 2500,
        description: user?.isError,
      });
    }
  }, [user?.isSuccess, user?.isError, navigate]);

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
        <div className="flex justify-center">
          <div className="bg-[#4A90E2] p-4 rounded-full">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1E1E1E]">
          Email Verification
        </h2>
        <p className="text-center text-[#6B7280] text-sm md:text-base">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP Boxes */}
        <div className="flex justify-between gap-2 md:gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 md:w-12 md:h-14 text-center text-xl md:text-2xl border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#4A90E2] bg-[#f9fafb]"
            />
          ))}
        </div>

        <Button
          onClick={handleVerify}
          className="w-full bg-[#4A90E2] hover:bg-[#357ABD] text-white text-lg"
        >
          Verify
        </Button>

        {verified && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg text-center shadow transition-all duration-300">
            ✅ Email Verified! Redirecting to login...
          </div>
        )}

        <p className="text-center text-sm text-[#94A3B8]">
          Didn’t receive the code?{" "}
          <span className="text-[#4A90E2] hover:underline cursor-pointer">
            Resend
          </span>
        </p>
      </div>
    </div>
  );
}
