import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Users, Clock, ChevronLeft, Bookmark } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSingleCourseById } from "@/store/courseSlice";

const HeroCourse = () => {
  const { id } = useParams();
  const { singleCourse } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const course = singleCourse?.getSingleCourse;

  useEffect(() => {
    dispatch(getSingleCourseById(id));
  }, [dispatch, id]);

  if (!course)
    return <div className="h-64 animate-pulse bg-gray-100 rounded-lg" />;

  const discountedPrice = course.price - (course.price * course.discount) / 100;

  return (
    <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Thumbnail Column */}
        <div className="w-full md:w-80 space-y-3">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-1 px-2 text-gray-600 hover:bg-gray-100"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Courses
          </Button>
          <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            {course.discount > 0 && (
              <div className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded">
                {course.discount}% OFF
              </div>
            )}
          </div>
        </div>

        {/* Content Column */}
        <div className="flex-1 space-y-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="capitalize px-3 py-1">
                {course.level}
              </Badge>
              {course.category?.name && (
                <Badge variant="outline" className="px-3 py-1">
                  <Bookmark className="w-3 h-3 mr-1" />
                  {course.category.name}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {course.title}
            </h1>

            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={course.instructor?.avatar} />
                <AvatarFallback>
                  {course.instructor?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-gray-700">
                By {course.instructor?.name}
              </span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed max-w-3xl">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-1 text-gray-700">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>
                {course.avgRatings?.toFixed(1) || "New"} •{" "}
                {course.ratings?.length || 0} reviews
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-700">
              <Users className="w-4 h-4" />
              <span>{course.enrolled?.length || 0} students</span>
            </div>
            <div className="flex items-center gap-1 text-gray-700">
              <Clock className="w-4 h-4" />
              <span>{course.duration} total hours</span>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-baseline gap-3">
              {course.discount > 0 ? (
                <>
                  <span className="text-2xl font-bold text-gray-900">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="line-through text-gray-500">
                    ${course.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  ${course.price.toFixed(2)}
                </span>
              )}
            </div>

            <Button
              size="lg"
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              {user?.enrolledCourses?.includes(course._id)
                ? "Continue Learning"
                : "Enroll Now"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCourse;
