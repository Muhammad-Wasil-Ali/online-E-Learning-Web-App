// import React from "react";
import "@fontsource/roboto/400.css"; // Regular
import "@fontsource/roboto/700.css"; // Bold
import "./App.css";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EmailVerification from "./pages/EmailVerification";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import StudentDashboard from "./pages/StudentDashboard";
import CourseDetails from "./pages/CourseDetails";
import Courses from "./pages/Courses";
import InstructorDashboard from "./Dashboards/InstructorDashboard/InstructorDashboard";
const App = () => {
  return (
    <>
      <main
        className="app font-roboto 
      min-h-screen bg-lightBg"
      >
        <Navbar />
        <Toaster expand={true} closeButton={true} richColors={true} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/emailverification" element={<EmailVerification />} />
          <Route
            path="instructor/dashboard"
            element={<InstructorDashboard />}
          />
          <Route path="student/dashboard" element={<StudentDashboard />} />

          <Route path="/coursedetails/:id" element={<CourseDetails />} />

          <Route path="/courses" element={<Courses />} />
        </Routes>
        <Toaster />
        <Footer />
      </main>
    </>
  );
};

export default App;
