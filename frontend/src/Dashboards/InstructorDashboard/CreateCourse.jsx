import { useState, useRef } from "react";
import { Plus, Upload, Percent, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "beginner",
    price: 0,
    discount: 0,
    thumbnail: "",
    duration: 0,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "discount" || name === "duration"
          ? Number(value)
          : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
      setFormData((prev) => ({ ...prev, thumbnail: file.name }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // You'll add API call here later
  };

  const mockCategories = [
    { _id: "1", name: "Web Development" },
    { _id: "2", name: "Mobile Development" },
    { _id: "3", name: "Data Science" },
  ];

  // Calculate discounted price
  const discountedPrice = formData.price * (1 - formData.discount / 100);

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 shadow-sm lg:shadow-lg">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">
            Create New Course
          </CardTitle>
          <Badge
            variant="outline"
            className="text-sm font-medium self-start md:self-auto"
          >
            Required fields *
          </Badge>
        </div>
        <Separator className="my-3 md:my-4" />
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 md:space-y-6">
          {/* Basic Information */}
          <div className="space-y-2 md:space-y-3">
            <Label htmlFor="title" className="text-gray-700">
              Course Title *
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Advanced React Patterns"
              className="h-10 md:h-12"
              required
            />
          </div>

          <div className="space-y-2 md:space-y-3">
            <Label htmlFor="description" className="text-gray-700">
              Description *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What will students learn in this course?"
              rows={4}
              className="min-h-[100px] md:min-h-[120px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <div className="space-y-2 md:space-y-3">
              <Label htmlFor="category" className="text-gray-700">
                Category *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                required
              >
                <SelectTrigger className="h-10 md:h-12">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:space-y-3">
              <Label htmlFor="level" className="text-gray-700">
                Difficulty Level *
              </Label>
              <Select
                value={formData.level}
                onValueChange={(value) =>
                  setFormData({ ...formData, level: value })
                }
              >
                <SelectTrigger className="h-10 md:h-12">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <div className="space-y-2 md:space-y-3">
              <Label htmlFor="price" className="text-gray-700">
                Base Price (USD) *
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="1"
                value={formData.price}
                onChange={handleChange}
                className="h-10 md:h-12"
                required
              />
            </div>

            <div className="space-y-2 md:space-y-3">
              <Label htmlFor="discount" className="text-gray-700">
                Discount (%)
              </Label>
              <div className="relative">
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={handleChange}
                  className="h-10 md:h-12 pl-9 md:pl-10"
                />
                <div className="absolute left-3 top-2.5 md:top-3 text-gray-400">
                  <Percent className="h-4 w-4 md:h-5 md:w-5" />
                </div>
              </div>
            </div>

            <div className="space-y-2 md:space-y-3">
              <Label className="text-gray-700">Discounted Price</Label>
              <div className="h-10 md:h-12 flex items-center px-3 md:px-4 border rounded-md bg-gray-50">
                <span className="font-medium text-sm md:text-base">
                  ${discountedPrice.toFixed(2)}
                </span>
                {formData.discount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 text-xs md:text-sm"
                  >
                    {formData.discount}% off
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <div className="space-y-2 md:space-y-3">
              <Label htmlFor="duration" className="text-gray-700">
                Duration (minutes) *
              </Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                value={formData.duration}
                onChange={handleChange}
                className="h-10 md:h-12"
                required
              />
            </div>

            <div className="space-y-2 md:space-y-3">
              <Label htmlFor="thumbnail" className="text-gray-700">
                Thumbnail *
              </Label>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    id="thumbnail"
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 md:h-12 flex-1 justify-start gap-2"
                    onClick={triggerFileInput}
                  >
                    <Image className="h-4 w-4" />
                    <span className="truncate">
                      {formData.thumbnail || "Choose an image"}
                    </span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 md:h-12 px-3 md:px-4"
                    onClick={triggerFileInput}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                {thumbnailPreview && (
                  <div className="mt-1 border rounded-md overflow-hidden">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end pt-4 md:pt-6">
          <Button
            type="submit"
            className="h-11 md:h-12 px-6 md:px-8 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
          >
            <Plus className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            <span className="text-sm md:text-base">Create Course</span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateCourse;
