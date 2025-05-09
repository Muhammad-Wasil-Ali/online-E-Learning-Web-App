import CourseTabs from "@/components/CourseDetailsPageComponents/CourseTabs";
import HeroCourse from "@/components/CourseDetailsPageComponents/HeroCourse";
import LessonSidebar from "@/components/CourseDetailsPageComponents/LessonSidebar";
import ReviewsSection from "@/components/CourseDetailsPageComponents/ReviewsSection";
import VideoPlayerSection from "@/components/CourseDetailsPageComponents/VideoPlayerSection";

const CourseDetails = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* 1. Hero Section */}
      <HeroCourse />

      {/* 2. Main Content - Video + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:flex-1">
          <VideoPlayerSection />
        </div>
        <div className="lg:w-80">
          <LessonSidebar />
        </div>
      </div>

      {/* 3. Tabbed Content */}
      <CourseTabs />

      {/* 4. Reviews (only for enrolled users) */}
      <ReviewsSection />

      {/* 5. Footer */}
      {/* <CourseFooter /> */}
    </div>
  );
};

export default CourseDetails;
