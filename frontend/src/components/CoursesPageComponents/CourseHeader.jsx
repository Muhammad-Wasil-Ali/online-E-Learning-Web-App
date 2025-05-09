import { Input } from "@/components/ui/input";

export default function CourseHeader() {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-bold">Browse All Courses</h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Find the perfect course to advance your skills
      </p>
      <div className="max-w-md mx-auto mt-4">
        <Input placeholder="Search courses..." className="w-full" />
      </div>
    </div>
  );
}
