import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import CreateCourse from "./CreateCourse";
import ManageCategories from "./ManageCategories";
import CoursesList from "./CoursesList";

const InstructorCourses = () => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">Course Management</h1>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-xs">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="courseslist">Courses List</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Create Course Here</h2>
            <CreateCourse />
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Manage Categories</h2>
            <ManageCategories />
          </Card>
        </TabsContent>

        <TabsContent value="courseslist">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">All Courses</h2>
            <CoursesList />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstructorCourses;
