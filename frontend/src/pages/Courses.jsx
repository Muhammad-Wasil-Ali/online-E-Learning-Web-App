import CourseFilters from "@/components/CoursesPageComponents/CourseFilters";
import CoursesList from "@/components/CoursesPageComponents/CoursesList";
import CourseHeader from "@/components/CoursesPageComponents/CourseHeader";

const Courses = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* 1. Header Section */}
      <CourseHeader />

      {/* 2. Main Content - Filters + List */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-64">
          <CourseFilters />
        </div>

        {/* Courses List */}
        <div className="flex-1">
          <CoursesList />
        </div>
      </div>
    </div>
  );
};

export default Courses;
