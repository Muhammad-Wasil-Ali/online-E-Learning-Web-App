import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Star, Users, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "@/store/courseSlice";

export const LatestCourses = () => {
  const { courses, isLoading, isError, isSuccess } = useSelector(
    (state) => state.course
  );
  console.log(courses?.getAllCourse);
  // Mock data matching your Mongoose schema
  // const courses = [
  //   {
  //     _id: "1",
  //     title: "Modern Web Development with React",
  //     description:
  //       "Master React hooks, context API and modern frontend development techniques with hands-on projects.",
  //     level: "intermediate",
  //     price: 89.99,
  //     discount: 15,
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  //     avgRatings: 4.7,
  //     lessonCount: 24,
  //     duration: 720, // in minutes
  //     enrolled: Array(125).fill(0), // Mock 125 enrolled students
  //   },
  //   {
  //     _id: "2",
  //     title: "Python for Beginners",
  //     description:
  //       "Learn Python programming fundamentals from scratch with practical exercises.",
  //     level: "beginner",
  //     price: 49.99,
  //     discount: 0,
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  //     avgRatings: 4.5,
  //     lessonCount: 18,
  //     duration: 540,
  //     enrolled: Array(89).fill(0),
  //   },
  //   {
  //     _id: "3",
  //     title: "Advanced Machine Learning",
  //     description:
  //       "Deep dive into neural networks, NLP and computer vision with TensorFlow.",
  //     level: "advanced",
  //     price: 129.99,
  //     discount: 20,
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  //     avgRatings: 4.9,
  //     lessonCount: 32,
  //     duration: 960,
  //     enrolled: Array(72).fill(0),
  //   },
  // ];
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCourses = () => {
      dispatch(getAllCourses());
    };

    fetchAllCourses();
  }, [dispatch, getAllCourses]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Explore <span className="text-primary">Latest Courses</span>
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Freshly added courses to boost your skills
            </p>
          </div>
          <Link to="/courses">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              View All Courses
            </Button>
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses?.getAllCourse.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 group"
            >
              {/* Course Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.level === "beginner"
                        ? "bg-blue-100 text-blue-800"
                        : course.level === "intermediate"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {course.level.charAt(0).toUpperCase() +
                      course.level.slice(1)}
                  </span>
                </div>
                {course.discount > 0 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {course.discount}% OFF
                  </div>
                )}
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl line-clamp-2">
                    {course.title}
                  </h3>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded ml-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{3}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {course.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <PlayCircle className="w-4 h-4 mr-1" />
                    <span>{course.lessonCount} lessons</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>
                      {Math.floor(course.duration / 60)}h {course.duration % 60}
                      m
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{course.enrolled.length}</span>
                  </div>
                </div>

                {/* Price & Enroll */}
                <div className="flex justify-between items-center">
                  <div>
                    {course.discount > 0 ? (
                      <>
                        <span className="text-gray-400 line-through mr-2">
                          ${course.price.toFixed(2)}
                        </span>
                        <span className="font-bold text-primary">
                          $
                          {(course.price * (1 - course.discount / 100)).toFixed(
                            2
                          )}
                        </span>
                      </>
                    ) : (
                      <span className="font-bold text-primary">
                        ${course.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <Link to={`/courses/${course._id}`}>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primaryHover"
                    >
                      Enroll Now
                    </Button>
                  </Link>
                  <Link to={`/coursedetails/${course._id}`}>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primaryHover"
                    >
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
