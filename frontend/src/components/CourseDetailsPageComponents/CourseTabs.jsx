import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Play,
  CheckCircle,
  MessageSquare,
  Download,
} from "lucide-react";

export default function CourseTabs() {
  // Dummy data - replace with your actual course data
  const course = {
    description:
      "This course covers everything from basic to advanced React concepts...",
    lessons: [
      { _id: "1", title: "Introduction", duration: "12:45" },
      { _id: "2", title: "Setup", duration: "8:30" },
    ],
    quizzes: [{ _id: "q1", title: "Basic Concepts Quiz", lessonId: "1" }],
    resources: [
      { name: "Course Slides.pdf", url: "#" },
      { name: "Starter Code.zip", url: "#" },
    ],
  };

  return (
    <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <FileText className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="lessons">
            <Play className="w-4 h-4 mr-2" />
            Lessons
          </TabsTrigger>
          <TabsTrigger value="resources">
            <Download className="w-4 h-4 mr-2" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="quizzes">
            <CheckCircle className="w-4 h-4 mr-2" />
            Quizzes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="p-4">
          <h3 className="text-lg font-semibold mb-2">Course Description</h3>
          <p className="text-gray-700">{course.description}</p>

          <h3 className="text-lg font-semibold mt-6 mb-2">What You'll Learn</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Master React fundamentals</li>
            <li>Build real-world applications</li>
            <li>Learn state management</li>
          </ul>
        </TabsContent>

        <TabsContent value="lessons" className="p-4">
          <div className="space-y-3">
            {course.lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Play className="w-4 h-4 text-gray-500" />
                  <span>{lesson.title}</span>
                </div>
                <span className="text-sm text-gray-500">{lesson.duration}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="p-4">
          <div className="space-y-3">
            {course.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
              >
                <Download className="w-4 h-4 text-gray-500" />
                <span>{resource.name}</span>
              </a>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quizzes" className="p-4">
          <div className="space-y-3">
            {course.quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-gray-500" />
                  <span>{quiz.title}</span>
                </div>
                <span className="text-sm text-gray-500">
                  Lesson {quiz.lessonId}
                </span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
