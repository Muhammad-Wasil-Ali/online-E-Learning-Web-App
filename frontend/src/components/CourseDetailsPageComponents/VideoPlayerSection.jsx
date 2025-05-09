import { Play, Lock, CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function VideoPlayerSection() {
  // Dummy data - replace with API data later
  const currentLesson = {
    id: "1",
    title: "Introduction to React Fundamentals",
    duration: "15:30",
    description:
      "Learn the core concepts of React including components, props, and state management.",
    completed: false,
    resources: ["Slide Deck.pdf", "Starter Code.zip"],
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Video Placeholder */}
      <div className="aspect-video bg-black flex items-center justify-center">
        <div className="text-center text-gray-400">
          <Play className="w-12 h-12 mx-auto mb-3" />
          <p>Video player will appear here</p>
        </div>
      </div>

      {/* Lesson Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold">{currentLesson.title}</h3>
          <p className="text-gray-600 mt-1">
            {currentLesson.duration} • Lesson 1 of 12
          </p>
        </div>

        <p className="text-gray-700">{currentLesson.description}</p>

        <div className="flex gap-3 pt-2">
          <Button>
            {currentLesson.completed ? (
              <CheckCircle className="w-4 h-4 mr-2" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {currentLesson.completed ? "Completed" : "Mark as Complete"}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Resources
          </Button>
        </div>
      </div>
    </div>
  );
}
