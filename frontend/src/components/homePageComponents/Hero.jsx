import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Play } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import hero_img from "../../assets/hero_img.svg"; // Ensure correct image path

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50/80 via-white to-blue-100/50 py-20 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-purple-400 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Unlock Your Future <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accentPurple">
              <Typewriter
                words={[
                  "Learn Anytime, Anywhere",
                  "Empower Your Knowledge",
                  "Interactive Live Sessions",
                  "Certified Courses by Experts",
                  "Boost Your Career Today",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h1>

          <p className="mt-4 text-gray-700 text-lg sm:text-xl leading-relaxed max-w-2xl">
            Join thousands of learners worldwide on{" "}
            <span className="font-semibold text-primary">EduSpark</span> — the
            all-in-one online learning platform designed to sharpen your skills
            and empower your career from the comfort of your home.
          </p>

          {/* Combined CTA Button */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
            <Button className="relative overflow-hidden group bg-gradient-to-r from-primary to-accentPurple hover:from-primaryHover hover:to-accentPurple/90 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <span className="relative z-10 flex items-center">
                Start Learning Now
                <ArrowRight
                  className="ml-3 group-hover:translate-x-1 transition-transform"
                  size={22}
                />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primaryHover to-accentPurple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>

            <div className="flex items-center gap-3">
              <button className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-md hover:shadow-lg transition-all group">
                <Play
                  className="w-6 h-6 text-primary group-hover:text-accentPurple transition-colors"
                  fill="currentColor"
                />
              </button>
              <span className="text-gray-700 font-medium">Watch Demo</span>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((item) => (
                  <img
                    key={item}
                    src={`https://randomuser.me/api/portraits/${
                      item % 2 === 0 ? "women" : "men"
                    }/${item + 20}.jpg`}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-gray-700 font-medium">
                10K+ Active Learners
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-gray-700 font-medium">500+ Courses</span>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accentPurple/20 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-1 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl group-hover:scale-[1.02] transition-all duration-300 border border-gray-200/50 overflow-hidden">
              <img
                src={hero_img}
                alt="Online Learning Illustration"
                className="w-full h-auto max-w-md rounded-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/90 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
