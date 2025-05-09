import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Bookmark, ChevronDown, ChevronUp } from "lucide-react";

export default function CourseFilters() {
  // Dummy data - replace with your actual categories
  const categories = [
    { id: "web", name: "Web Development", icon: "🌐" },
    { id: "mobile", name: "Mobile Development", icon: "📱" },
    { id: "design", name: "UI/UX Design", icon: "🎨" },
    { id: "data", name: "Data Science", icon: "📊" },
    { id: "business", name: "Business", icon: "💼" },
  ];

  const levels = [
    { id: "beginner", name: "Beginner", color: "bg-green-100 text-green-800" },
    {
      id: "intermediate",
      name: "Intermediate",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "advanced",
      name: "Advanced",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-8">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-blue-500" />
          Filter Courses
        </h3>
        <p className="text-sm text-gray-500">Narrow down your choices</p>
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="font-medium mb-3 flex items-center justify-between">
            <span>Categories</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </h4>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-3">
                <Checkbox id={`cat-${category.id}`} />
                <Label
                  htmlFor={`cat-${category.id}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Level */}
        <div>
          <h4 className="font-medium mb-3 flex items-center justify-between">
            <span>Difficulty</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </h4>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <div key={level.id} className="flex items-center">
                <Checkbox id={`level-${level.id}`} className="hidden peer" />
                <Label
                  htmlFor={`level-${level.id}`}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer border peer-hover:shadow-sm peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-offset-2 peer-data-[state=checked]:ring-blue-500 ${level.color}`}
                >
                  {level.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Tags */}
        <div>
          <h4 className="font-medium mb-3">Popular Tags</h4>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "JavaScript",
              "Python",
              "Design",
              "2024",
              "Trending",
            ].map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="px-3 py-1 rounded-full cursor-pointer hover:bg-gray-50"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Reset all filters
        </button>
      </div>
    </div>
  );
}
