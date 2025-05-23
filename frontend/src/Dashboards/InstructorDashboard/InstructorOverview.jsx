import {
  BookOpen,
  Users,
  DollarSign,
  BarChart2,
  Clock,
  Star,
  TrendingUp,
  FileText,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const InstructorOverview = () => {
  // Mock data - replace with real API calls to your backend
  const stats = {
    totalCourses: 8,
    totalStudents: 142,
    totalEarnings: 5240,
    avgRating: 4.7,
    activeStudents: 87,
    completionRate: 68,
  };

  const recentCourses = [
    {
      id: "1",
      title: "Advanced React Patterns",
      enrolled: 24,
      status: "published",
      lastUpdated: "2 days ago",
    },
    {
      id: "2",
      title: "Node.js Microservices",
      enrolled: 18,
      status: "published",
      lastUpdated: "1 week ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalEarnings}</div>
            <p className="text-xs text-muted-foreground">
              +8.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgRating}/5</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Student Engagement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Course Completion</span>
                <span className="text-sm text-muted-foreground">
                  {stats.completionRate}%
                </span>
              </div>
              <Progress value={stats.completionRate} />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Active Students</span>
                <span className="text-sm text-muted-foreground">
                  {stats.activeStudents}/{stats.totalStudents}
                </span>
              </div>
              <Progress
                value={(stats.activeStudents / stats.totalStudents) * 100}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                <div>
                  <p className="text-sm font-medium">Course sales up</p>
                  <p className="text-xs text-muted-foreground">
                    8 new enrollments today
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-blue-500 mr-2" />
                <div>
                  <p className="text-sm font-medium">New review received</p>
                  <p className="text-xs text-muted-foreground">
                    5 stars on "Advanced React"
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{course.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {course.enrolled} students enrolled
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {course.lastUpdated}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      course.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorOverview;
