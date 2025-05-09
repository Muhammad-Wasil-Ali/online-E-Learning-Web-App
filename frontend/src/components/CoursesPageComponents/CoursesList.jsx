import { Button } from "@/components/ui/button";
import { Star, Users, Clock } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CoursesList() {
  // Dummy data - replace with your actual course data

  const { courses } = useSelector((state) => state.course);
  const allCourse = courses.getAllCourse;
  //   const courses = [
  //     {
  //       id: "1",
  //       title: "React Fundamentals",
  //       description: "Learn React from the ground up",
  //       category: "Web Development",
  //       level: "Beginner",
  //       price: 49.99,
  //       discount: 20,
  //       enrolled: 125,
  //       rating: 4.5,
  //       duration: "8 hours",
  //       thumbnail: "/react-course.jpg",
  //     },
  //     // Add more courses...
  //   ];

  return (
    <div className="space-y-6">
      {/* Sorting Controls */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {allCourse.length} courses found
        </p>
        <Select>
          <SelectTrigger className="w-40">Sort By</SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {allCourse.map((course) => (
          <div
            key={course.id}
            className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full md:w-48 h-36 object-cover rounded-lg"
            />

            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-2">
                    {course.level}
                  </span>
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 mt-2 line-clamp-2">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.enrolled} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>

            <div className="md:w-40 flex flex-col items-end justify-between">
              {course.discount > 0 ? (
                <div className="text-right">
                  <span className="text-lg font-bold">
                    ${(course.price * (1 - course.discount / 100)).toFixed(2)}
                  </span>
                  <span className="line-through text-gray-500 ml-2">
                    ${course.price}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold">${course.price}</span>
              )}
              <Link to={`/coursedetails/${course._id}`}>
                <Button size="sm" className="mt-2">
                  View Course
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
