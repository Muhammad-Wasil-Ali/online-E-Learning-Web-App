// import Overview from '../../Overview';
// import Courses from '../../Courses';
// import Students from '../../Students';
// import Earnings from '../../Earnings';
// import Analytics from '../../Analytics';

import InstructorCourses from "./InstructorCourses";
import InstructorOverview from "./InstructorOverview";

const InstructorContentArea = ({ activeTab }) => {
  return (
    <div className="flex-1 overflow-auto md:p-6">
      {activeTab === "overview" && <InstructorOverview />}
      {activeTab === "courses" && <InstructorCourses />}
      {/*{activeTab === 'students' && <Students />}
      {activeTab === 'earnings' && <Earnings />}
      {activeTab === 'analytics' && <Analytics />} */}
    </div>
  );
};

export default InstructorContentArea;
