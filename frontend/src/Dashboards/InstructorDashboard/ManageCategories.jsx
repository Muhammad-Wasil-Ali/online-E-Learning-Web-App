import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, ChevronDown, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategories,
  deleteCategory,
  getAllCategories,
  updateCategories,
  resetCourseState,
} from "@/store/courseSlice";
import { toast } from "sonner"; // or your preferred toast library

const ManageCategories = () => {
  const { category, isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.course
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Operation successful");
      dispatch(resetCourseState());
    }
    if (isError) {
      toast.error(errorMessage || "Something went wrong");
      dispatch(resetCourseState());
    }
  }, [isSuccess, isError, errorMessage, dispatch]);

  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCategory = () => {
    if (!name.trim()) return;
    dispatch(createCategories(name.trim()));
    setName("");
  };

  const handleUpdate = (id) => {
    if (!editValue.trim()) return;
    dispatch(updateCategories({ id, editValue: editValue.trim() }));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <Card className="w-full max-w-2xl border-none shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Course Categories
          </CardTitle>
          <Badge variant="outline" className="text-sm font-medium">
            {category?.categories?.length || 0} categories
          </Badge>
        </div>
        <Separator className="my-3" />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Add Category Form */}
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Enter new category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 h-10"
            onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
            disabled={isLoading}
          />
          <Button
            onClick={handleAddCategory}
            disabled={!name.trim() || isLoading}
            className="h-10 px-4 gap-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </div>

        {/* Categories Dropdown */}
        <DropdownMenu onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full h-12 justify-between px-4 border-gray-300 hover:bg-gray-50"
              disabled={isLoading}
            >
              <span className="text-gray-700">Browse all categories</span>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="w-[calc(100%-32px)] max-h-72 overflow-y-auto p-2 shadow-lg rounded-lg border border-gray-200"
          >
            {!category?.categories?.length ? (
              <div className="py-3 text-center text-sm text-gray-500">
                No categories found
              </div>
            ) : (
              category.categories.map((category) => (
                <div key={category._id} className="group">
                  {editingId === category._id ? (
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="h-9 flex-1 bg-white"
                        autoFocus
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleUpdate(category._id)
                        }
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-9 w-9 p-0 text-gray-500 hover:text-gray-700"
                        onClick={() => setEditingId(null)}
                        disabled={isLoading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="h-9 bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleUpdate(category._id)}
                        disabled={!editValue.trim() || isLoading}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <DropdownMenuItem
                      className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingId(category._id);
                            setEditValue(category.name);
                          }}
                          disabled={isLoading}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(category._id);
                          }}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </DropdownMenuItem>
                  )}
                </div>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};

export default ManageCategories;
