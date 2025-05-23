import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BadgeDollarSign,
  BookOpen,
  Clock,
  Edit2,
  Eye,
  FileText,
  MoreVertical,
  Trash2,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CoursesList = () => {
  // Mock data - replace with your API data
  const courses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      category: "Web Development",
      status: "published",
      price: 49.99,
      discount: 10,
      enrolled: 42,
      duration: 360,
      createdAt: "2023-10-15",
    },
    {
      id: 2,
      title: "Mobile App Development with Flutter",
      category: "Mobile Development",
      status: "draft",
      price: 59.99,
      discount: 0,
      enrolled: 15,
      duration: 420,
      createdAt: "2023-11-02",
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      category: "Data Science",
      status: "published",
      price: 79.99,
      discount: 20,
      enrolled: 28,
      duration: 540,
      createdAt: "2023-09-20",
    },
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case "published":
        return "default";
      case "draft":
        return "secondary";
      case "archived":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          Your Courses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Course</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Enrolled</TableHead>
              <TableHead className="text-center">Duration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <BookOpen className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{course.title}</p>
                      <p className="text-sm text-gray-500">
                        Created: {course.createdAt}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(course.status)}>
                    {course.status.charAt(0).toUpperCase() +
                      course.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      ${(course.price * (1 - course.discount / 100)).toFixed(2)}
                    </span>
                    {course.discount > 0 && (
                      <span className="text-xs text-gray-500 line-through">
                        ${course.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{course.enrolled}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>
                      {Math.floor(course.duration / 60)}h {course.duration % 60}
                      m
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Users className="h-4 w-4" />
                        Students ({course.enrolled})
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <FileText className="h-4 w-4" />
                        Content
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-red-600">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CoursesList;
