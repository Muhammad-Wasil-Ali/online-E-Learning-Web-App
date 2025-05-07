import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Users, Clock, ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const HeroCourse = () => {
  const { id } = useParams();
  console.log(id);
  const { courses } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  console.log(courses);
  if (!courses) return null;

  // Calculate discounted price
  const discountedPrice =
    courses.price - (courses.price * courses.discount) / 100;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column - Thumbnail */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-1 w-fit"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Courses
          </Button>
          <img
            src={courses.thumbnail}
            alt={courses.title}
            className="w-full md:w-64 h-48 object-cover rounded-lg"
          />
        </div>

        {/* Right Column - Course Meta */}
        <div className="flex-1 space-y-4">
          <div>
            <Badge variant="secondary" className="capitalize">
              {courses.level}
            </Badge>
            <h1 className="text-3xl font-bold mt-2">{courses.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={courses.instructor?.avatar} />
                <AvatarFallback>
                  {courses.instructor?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>By {courses.instructor?.name}</span>
            </div>
          </div>

          <p className="text-gray-600">{courses.description}</p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>
                {courses.avgRatings?.toFixed(1) || "New"} •{" "}
                {courses.ratings?.length || 0} reviews
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{courses.enrolled?.length || 0} students</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{courses.duration} total hours</span>
            </div>
          </div>

          {/* Price & Enrollment */}
          <div className="flex items-center gap-4 mt-4">
            {courses.discount > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="line-through text-gray-500">
                  ${courses.price.toFixed(2)}
                </span>
                <Badge variant="destructive" className="whitespace-nowrap">
                  {courses.discount}% OFF
                </Badge>
              </div>
            ) : (
              <span className="text-2xl font-bold">${courses.price}</span>
            )}

            <Button className="ml-auto">
              {user?.enrolledCourses?.includes(courses._id)
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
