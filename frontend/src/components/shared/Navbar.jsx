import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sun,
  Moon,
  Menu,
  X,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  BookOpen,
  HelpCircle,
  Home,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { isSuccessFalse, logout } from "@/store/userSlice";
import { toast } from "sonner";

export default function Navbar() {
  //useSelector Hook

  const user = useSelector((state) => state.user);
  console.log(user?.user?.user.role);
  //dispatch hook

  const dispatch = useDispatch();

  //naviaget

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (user?.isSuccess) {
      toast("Logout Successfully", {
        duration: 2500,
      });
      setTimeout(() => {
        navigate("/");
        dispatch(isSuccessFalse());
      }, 2500);
    }
  }, [user?.isSuccess, navigate, dispatch, isSuccessFalse]);

  return (
    <nav
      className={`w-full sticky top-0 z-50 border-b transition-colors duration-300 ${
        darkMode
          ? "bg-darkBg text-textLight border-gray-800"
          : "bg-lightBg text-textDark border-borderGray"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <GraduationCap className="w-7 h-7 text-accentPurple group-hover:text-primary transition-colors" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accentPurple bg-clip-text text-transparent">
                EduSpark
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-1 py-2 text-sm font-medium rounded-md transition-colors ${
                darkMode
                  ? "text-textLight hover:text-primary"
                  : "text-textDark hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={`px-1 py-2 text-sm font-medium rounded-md transition-colors ${
                darkMode
                  ? "text-textLight hover:text-primary"
                  : "text-textDark hover:text-primary"
              }`}
            >
              Courses
            </Link>
            <Link
              to="/faq"
              className={`px-1 py-2 text-sm font-medium rounded-md transition-colors ${
                darkMode
                  ? "text-textLight hover:text-primary"
                  : "text-textDark hover:text-primary"
              }`}
            >
              FAQ
            </Link>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full hover:bg-opacity-20"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-300" />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
            </Button>

            {/* User Controls */}
            {user?.user ? (
              // Logged In - Show Avatar with Popover
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer h-9 w-9 border-2 border-primary hover:border-accentPurple transition-all">
                    <AvatarImage
                      src={user?.user?.user.profile.profilePhoto}
                      alt="User"
                    />
                    <AvatarFallback className="bg-primary text-white">
                      U
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent
                  className={`w-56 p-2 mt-2 ${
                    darkMode
                      ? "bg-darkBg border-gray-700"
                      : "bg-cardBg border-borderGray"
                  }`}
                  align="end"
                >
                  <div className="space-y-1">
                    {user?.user?.user.role === "instructor" ? (
                      <Link
                        to="/instructor/dashboard"
                        className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                          darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                        }`}
                      >
                        <LayoutDashboard className="w-5 h-5 text-primary" />
                        <span>Dashboard</span>
                      </Link>
                    ) : (
                      <Link
                        to="/student/dashboard"
                        className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                          darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                        }`}
                      >
                        <LayoutDashboard className="w-5 h-5 text-primary" />
                        <span>Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors ${
                        darkMode
                          ? "hover:bg-gray-800 text-red-400"
                          : "hover:bg-gray-100 text-error"
                      }`}
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              // Logged Out - Show Login/Signup (Desktop)
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login">
                  <Button
                    variant="outline"
                    className={`border-primary text-primary hover:bg-primary hover:text-white`}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-primary hover:bg-primaryHover">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full hover:bg-opacity-20 hover:bg-primary"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Only shows Login/Signup when logged OUT */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div
          className={`px-4 pt-2 pb-4 space-y-2 flex gap-2 flex-col ${
            darkMode ? "bg-darkBg" : "bg-lightBg"
          }`}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={`block px-3 py-3 mt-3 rounded-md text-base font-medium transition-colors ${
              darkMode
                ? "text-textLight hover:bg-gray-800"
                : "text-textDark hover:bg-gray-100"
            }`}
          >
            Home
          </Link>
          <Link
            to="/courses"
            onClick={() => setMenuOpen(false)}
            className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${
              darkMode
                ? "text-textLight hover:bg-gray-800"
                : "text-textDark hover:bg-gray-100"
            }`}
          >
            Courses
          </Link>
          <Link
            to="/faq"
            onClick={() => setMenuOpen(false)}
            className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${
              darkMode
                ? "text-textLight hover:bg-gray-800"
                : "text-textDark hover:bg-gray-100"
            }`}
          >
            FAQ
          </Link>

          {/* Only show Login/Signup in mobile menu when logged OUT */}
          {!user?.user && (
            <div className="pt-4 space-y-2">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="outline"
                  className={`w-full border-primary text-primary hover:bg-primary hover:text-white ${
                    darkMode ? "border-opacity-50" : ""
                  }`}
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primaryHover">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
