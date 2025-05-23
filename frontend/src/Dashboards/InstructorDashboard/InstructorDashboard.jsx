import { useState, useEffect } from "react";
import InstructorSidebar from "./InstructorSidebar";
import InstructorContentArea from "./InstructorContentArea";
import { Menu, X } from "lucide-react";

const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 bg-white border-r h-full flex flex-col fixed md:relative z-40 transition-all duration-300 ease-in-out ${
          isMobileSidebarOpen ? "left-0" : "-left-full md:left-0"
        }`}
      >
        <InstructorSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          closeSidebar={() => setIsMobileSidebarOpen(false)}
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto   md:p-6">
        <InstructorContentArea activeTab={activeTab} />
      </div>
    </div>
  );
};

export default InstructorDashboard;
