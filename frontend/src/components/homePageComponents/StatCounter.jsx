import React, { useEffect, useState } from "react";
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Clock,
  Smile,
} from "lucide-react";

export const StatCounter = () => {
  const [counts, setCounts] = useState({
    students: 0,
    courses: 0,
    instructors: 0,
    hours: 0,
    completionRate: 0,
    countries: 0,
  });

  useEffect(() => {
    // Animation duration
    const duration = 2000;
    const startTime = Date.now();

    const animateCounts = () => {
      const progress = Math.min(1, (Date.now() - startTime) / duration);

      setCounts({
        students: Math.floor(progress * 12500),
        courses: Math.floor(progress * 480),
        instructors: Math.floor(progress * 215),
        hours: Math.floor(progress * 1250),
        completionRate: Math.floor(progress * 94),
        countries: Math.floor(progress * 45),
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounts);
      }
    };

    animateCounts();
  }, []);

  const stats = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      value: counts.students.toLocaleString() + "+",
      label: "Active Learners",
      description: "Join our growing community",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      value: counts.courses,
      label: "Courses Available",
      description: "From beginner to advanced",
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      value: counts.instructors,
      label: "Expert Instructors",
      description: "Industry professionals",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      value: counts.hours + "+",
      label: "Hours of Content",
      description: "Comprehensive learning",
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      value: counts.completionRate + "%",
      label: "Completion Rate",
      description: "Students finish courses",
    },
    {
      icon: <Smile className="w-8 h-8 text-primary" />,
      value: counts.countries + "+",
      label: "Countries",
      description: "Global reach",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-primary">Learning Community</span> in
            Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands who are transforming their careers through education
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-full">{stat.icon}</div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {stat.label}
                  </h3>
                  <p className="text-gray-500 text-sm">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 items-center">
          <div className="text-center px-4 py-2 rounded-lg bg-white shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Trusted by</p>
            <div className="flex items-center justify-center gap-3 mt-1">
              {["Google", "Microsoft", "Amazon"].map((company) => (
                <span key={company} className="font-medium text-gray-800">
                  {company}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center px-4 py-2 rounded-lg bg-white shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Featured in</p>
            <div className="flex items-center justify-center gap-3 mt-1">
              {["Forbes", "TechCrunch", "EdSurge"].map((media) => (
                <span key={media} className="font-medium text-gray-800">
                  {media}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
