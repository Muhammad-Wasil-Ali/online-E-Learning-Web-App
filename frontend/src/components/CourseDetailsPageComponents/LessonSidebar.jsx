import { ChevronDown, ChevronUp, Play, Lock, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function LessonSidebar() {
  // Dummy data - replace with API data later
  const modules = [
    {
      name: "Getting Started",
      lessons: [
        {
          id: "1",
          title: "Introduction to React",
          duration: "12:45",
          completed: true,
          locked: false,
        },
        {
          id: "2",
          title: "Setting Up Environment",
          duration: "08:30",
          completed: true,
          locked: false,
        },
      ],
    },
    {
      name: "Core Concepts",
      lessons: [
        {
          id: "3",
          title: "Components and Props",
          duration: "15:20",
          completed: false,
          locked: false,
        },
        {
          id: "4",
          title: "State Management",
          duration: "22:10",
          completed: false,
          locked: true,
        },
      ],
    },
  ];

  const [expandedModules, setExpandedModules] = useState([
    "Getting Started",
    "Core Concepts",
  ]);
  const totalLessons = modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );
  const completedLessons = modules
    .flatMap((m) => m.lessons)
    .filter((l) => l.completed).length;

  const toggleModule = (moduleName) => {
    setExpandedModules((prev) =>
      prev.includes(moduleName)
        ? prev.filter((name) => name !== moduleName)
        : [...prev, moduleName]
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm h-full">
      {/* Progress Header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Course Content</h3>
          <span className="text-sm text-gray-500">
            {completedLessons}/{totalLessons} completed
          </span>
        </div>
        <Progress
          value={(completedLessons / totalLessons) * 100}
          className="h-2"
        />
      </div>

      {/* Lessons List */}
      <ScrollArea className="h-[500px]">
        {modules.map((module) => (
          <div key={module.name} className="border-b last:border-b-0">
            <button
              onClick={() => toggleModule(module.name)}
              className="w-full p-4 flex justify-between items-center hover:bg-gray-50"
            >
              <span className="font-medium">{module.name}</span>
              {expandedModules.includes(module.name) ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {expandedModules.includes(module.name) && (
              <div className="pb-2">
                {module.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 text-sm
                      ${lesson.locked ? "text-gray-400" : "hover:bg-gray-50"}
                    `}
                    disabled={lesson.locked}
                  >
                    {lesson.locked ? (
                      <Lock className="w-4 h-4 flex-shrink-0" />
                    ) : lesson.completed ? (
                      <CheckCircle className="w-4 h-4 flex-shrink-0 text-green-500" />
                    ) : (
                      <Play className="w-4 h-4 flex-shrink-0" />
                    )}
                    <span className="truncate">{lesson.title}</span>
                    <span className="ml-auto text-gray-500">
                      {lesson.duration}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
