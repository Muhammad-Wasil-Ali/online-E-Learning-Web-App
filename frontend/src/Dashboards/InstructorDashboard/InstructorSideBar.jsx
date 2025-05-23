import {
  LayoutDashboard,
  BookOpen,
  Users,
  DollarSign,
  BarChart2,
  ChevronRight,
  Settings,
  GraduationCap,
} from "lucide-react";

const InstructorSidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: "courses",
      label: "Courses",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: "students",
      label: "Students",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "earnings",
      label: "Earnings",
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart2 className="w-5 h-5" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-64 bg-white border-r h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center space-x-2">
        <GraduationCap className="w-6 h-6 text-blue-600" />
        <h1 className="text-xl font-bold text-gray-800">Instructor Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-between w-full p-3 rounded-lg transition-all ${
              activeTab === tab.id
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <span
                className={`${
                  activeTab === tab.id ? "text-blue-500" : "text-gray-400"
                }`}
              >
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </div>
            {activeTab === tab.id && (
              <ChevronRight className="w-4 h-4 text-blue-400" />
            )}
          </button>
        ))}
      </nav>

      {/* Footer (optional) */}
      <div className="p-4 border-t text-sm text-gray-500">
        <p>Teach • Inspire • Grow</p>
      </div>
    </div>
  );
};

export default InstructorSidebar;
